<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-container fluid style="width: 75%">
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              class="mr-6"
              v-if="type === 'day'"
              @click="
                () => {
                  this.type = 'month';
                }
              "
              prepend
            >
              <v-icon>mdi-keyboard-backspace</v-icon>back
            </v-btn>
            <v-icon
              @click="
                () => {
                  fetchAppointments();
                  fetchUsers();
                }
              "
              >mdi-refresh</v-icon
            >
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="secondary"
            :events="events"
            :event-color="getEventColor"
            :now="today"
            :focus="focus"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @change="updateRange"
          ></v-calendar>
        </v-sheet>
      </v-container>
      <v-dialog v-model="showAppointmentDetails" max-width="600px">
        <v-card>
          <v-banner
            sticky
            single-line
            color="primary"
            dark
            class="pa-2"
            elevation="6"
          >
            Appointment Details
            <template v-slot:actions v-if="!isChangeMode">
              <template
                v-if="
                  myUser.role === 'tutor' && selectedEvent.status === 'pending'
                "
              >
                <v-btn
                  @click="appointmentAction(acceptAppointment)"
                  color="green"
                  >accept</v-btn
                >
                <v-btn
                  @click="appointmentAction(rejectAppointment)"
                  color="black"
                  >reject</v-btn
                >
              </template>
              <v-btn
                @click="appointmentAction(cancelAppointment)"
                color="pink"
                v-if="
                  selectedEvent.status === 'approved' ||
                    (selectedEvent.status === 'pending' &&
                      myUser.role === 'student')
                "
                >terminate</v-btn
              >
              <v-btn
                @click="appointmentAction(finishAppointment)"
                color="green"
                v-if="
                  selectedEvent.status === 'approved' &&
                    myUser.role === 'student'
                "
                >finish</v-btn
              >
              <v-btn
                color="grey"
                v-if="
                  myUser.role === 'student' &&
                    selectedEvent.status === 'pending'
                "
                @click="isChangeMode = true"
                >change</v-btn
              >
            </template>
            <template v-slot:actions v-else>
              <v-btn @click="isChangeMode = false" color="grey">cancel</v-btn>
            </template>
          </v-banner>
          <v-card-text class="pa-6">
            <v-text-field
              label="status"
              prepend-icon="mdi-information-outline"
              :value="selectedEvent ? selectedEvent.status : ''"
              readonly
            ></v-text-field>
            <v-text-field
              label="student"
              prepend-icon="mdi-human-handsdown"
              :value="
                selectedEventStudent
                  ? `${selectedEventStudent.firstName} ${selectedEventStudent.lastName}`
                  : ''
              "
              readonly
            >
              <template v-slot:append-outer>
                <v-btn
                  :to="
                    `/profile/${
                      selectedEventStudent ? selectedEventStudent._id : ''
                    }`
                  "
                  >view profile</v-btn
                >
              </template>
            </v-text-field>
            <v-text-field
              label="tutor"
              prepend-icon="mdi-human-handsdown"
              :value="
                selectedEventTutor
                  ? `${selectedEventTutor.firstName} ${selectedEventTutor.lastName}`
                  : ''
              "
              readonly
            >
              <template v-slot:append-outer>
                <v-btn
                  :to="
                    `/profile/${
                      selectedEventTutor ? selectedEventTutor._id : ''
                    }`
                  "
                  >view profile</v-btn
                >
              </template>
            </v-text-field>
            <v-text-field
              label="price"
              prepend-icon="mdi-cash"
              :value="selectedEvent ? selectedEvent.price : ''"
              suffix="baht"
              readonly
            ></v-text-field>
            <template v-if="!isChangeMode">
              <v-text-field
                label="start time"
                prepend-icon="mdi-timer-outline"
                :value="
                  selectedEvent ? makeLocalTime(selectedEvent.startTime) : ''
                "
                readonly
              ></v-text-field>
              <v-text-field
                label="end time"
                prepend-icon="mdi-timer"
                :value="
                  selectedEvent ? makeLocalTime(selectedEvent.endTime) : ''
                "
                readonly
              ></v-text-field>
              <v-textarea
                class="pl-6"
                outlined
                name="location"
                label="location"
                readonly
                :value="selectedEvent ? selectedEvent.location : ''"
              ></v-textarea>
            </template>
            <template v-else>
              <v-divider class="my-6" />
              <v-form v-model="formIsValid" ref="form">
                <v-row align="center" justify="center" class="ma-1 mb-5">
                  <v-time-picker
                    v-model="patchItem.startTime"
                    class="mt-2"
                    landscape
                    format="ampm"
                  ></v-time-picker>
                </v-row>
                <v-label class="mt-0">End Time</v-label>
                <v-row align="center" justify="center" class="ma-1 mb-5">
                  <v-time-picker
                    v-model="patchItem.endTime"
                    class="mt-2"
                    landscape
                    format="ampm"
                  ></v-time-picker>
                </v-row>
                <v-text-field
                  v-model="patchItem.location"
                  type="text"
                  label="location"
                  prepend-icon="mdi-home"
                  :rules="[rules.required]"
                  required
                />
                <v-btn @click="submitChange" color="primary">submit</v-btn>
              </v-form>
            </template>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="timeErrorDialog" max-width="500px">
        <v-card>
          <v-card-title>Error</v-card-title>
          <v-card-text>{{ timeErrorMessage }}</v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="timeErrorDialog = false"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="appointmentError" max-width="290">
        <v-card>
          <v-card-title class="headline">Error</v-card-title>
          <v-card-text>{{ appointmentErrorMessage }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="setAppointmentError(false)">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter, Mutation } from "vuex-class";
import {
  LoginActions,
  LoginGetters,
  AppointmentGetters,
  AppointmentActions,
  UsersActions,
  UsersGetters,
  User,
  Appointment,
  CalendarReference,
  CalendarEventReference,
  Event,
  AppointmentState,
  AppointmentPatchItem,
  AppointmentMutations
} from "../types";
import { appointmentRules as rules } from "../rules";

@Component
export default class AppointmentPage extends Vue {
  @Action(LoginActions.protectedRedirect)
  private protectedRedirect!: () => void;

  @Action(AppointmentActions.selectAppointment)
  private selectAppointment!: (id: string) => void;
  @Action(AppointmentActions.acceptAppointment)
  private acceptAppointment!: () => void;
  @Action(AppointmentActions.rejectAppointment)
  private rejectAppointment!: () => void;
  @Action(AppointmentActions.cancelAppointment)
  private cancelAppointment!: () => void;
  @Action(AppointmentActions.finishAppointment)
  private finishAppointment!: () => void;
  @Action(AppointmentActions.editAppointment)
  private editAppointment!: (payload: AppointmentPatchItem) => void;

  @Action(AppointmentActions.fetchAppointments)
  private fetchAppointments!: () => void;
  @Action(UsersActions.fetchUsers)
  private fetchUsers!: () => void;

  @Getter(AppointmentGetters.getAppointmentError)
  private appointmentError!: boolean;
  @Getter(AppointmentGetters.getAppointmentErrorMessage)
  private appointmentErrorMessage!: string;
  @Mutation(AppointmentMutations.setAppointmentError)
  private setAppointmentError!: (error: boolean) => void;

  @Getter(AppointmentGetters.getAppointments)
  private appointments!: Appointment[];
  private get events(): Event[] {
    return this.appointments.map(item => {
      return {
        ...item,
        name: item.status,
        start: this.makeISOStringWithLocalOffset(item.startTime).substr(0, 10),
        end: this.makeISOStringWithLocalOffset(item.startTime).substr(0, 10)
      };
    });
  }

  @Getter(UsersGetters.getUserById) private getUserById!: (id: string) => User;

  @Getter(LoginGetters.getUser) private myUser!: User;

  private showAppointmentDetails = false;
  private selectedEvent!: Event;
  private selectedEventTutor: User = this.myUser;
  private selectedEventStudent: User = this.myUser;

  private rules = rules;
  private isChangeMode = false;
  private patchItem: AppointmentPatchItem = {
    startTime: "",
    endTime: "",
    location: ""
  };
  private timeErrorDialog = false;
  private timeErrorMessage = "";
  private formIsValid = true;
  renderForChangeData() {
    this.patchItem.startTime = this.makeLocalTime(this.selectedEvent.startTime);
    this.patchItem.endTime = this.makeLocalTime(this.selectedEvent.endTime);
    this.patchItem.location = this.selectedEvent.location;
  }
  private combineDateAndTime(date: string, time: string) {
    const generatedDate = new Date(date);
    const [hours, minutes] = time.split(":");
    generatedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return generatedDate.toUTCString();
  }
  async submitChange() {
    this.validate();
    if (this.formIsValid && this.validateTime()) {
      try {
        this.isChangeMode = false;
        await this.editAppointment({
          location: this.patchItem.location,
          startTime: this.combineDateAndTime(
            this.selectedEvent.startTime,
            this.patchItem.startTime
          ),
          endTime: this.combineDateAndTime(
            this.selectedEvent.endTime,
            this.patchItem.endTime
          )
        });
        this.showAppointmentDetails = false;
      } catch (error) {
        this.timeErrorDialog = true;
        if (error.includes("400")) {
          this.timeErrorMessage = "insufficient credit";
        } else {
          this.timeErrorMessage = "something is wrong with the server";
        }
      }
    }
  }
  validateTime() {
    if (this.patchItem.endTime <= this.patchItem.startTime) {
      this.timeErrorDialog = true;
      this.timeErrorMessage = "end time must be after start time";
      return false;
    } else {
      return true;
    }
  }
  validate() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();
  }

  mounted() {
    this.protectedRedirect();
    this.fetchAppointments();
    this.fetchUsers();
  }

  private type = "month";
  private today: string = this.formattedTodayDate;
  private focus: string = this.formattedTodayDate;
  private start: CalendarReference | null = null;
  private end: CalendarReference | null = null;
  private get calendarInstance(): Vue & {
    prev: () => void;
    next: () => void;
    getFormatter: (format: any) => any;
  } {
    return this.$refs.calendar as Vue & {
      prev: () => void;
      next: () => void;
      getFormatter: (format: any) => any;
    };
  }
  private makeISOStringWithLocalOffset(datestring: string) {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(
      new Date(datestring).getTime() - timeZoneOffset
    ).toISOString();
  }
  private get formattedTodayDate() {
    return this.makeISOStringWithLocalOffset(new Date().toISOString()).substr(
      0,
      10
    );
  }
  private get title() {
    const { start, end } = this;
    if (!start || !end) return "";
    const startMonth: any = this.monthFormatter(start);
    const startYear: any = start.year;
    return `${startMonth} ${startYear}`;
  }
  private get monthFormatter() {
    return this.calendarInstance.getFormatter({
      timeZone: "UTC",
      month: "long"
    });
  }
  private prev() {
    this.calendarInstance.prev();
  }
  private next() {
    this.calendarInstance.next();
  }

  updateRange({
    start,
    end
  }: {
    start: CalendarReference;
    end: CalendarReference;
  }) {
    this.start = start;
    this.end = end;
  }

  showEvent(eventRef: CalendarEventReference) {
    this.selectedEvent = eventRef.event;
    this.renderForChangeData();
    this.selectAppointment(eventRef.event._id);
    this.selectedEventTutor = this.getUserById(eventRef.event.tutor);
    this.selectedEventStudent = this.getUserById(eventRef.event.student);
    this.showAppointmentDetails = true;
  }

  getEventColor(event: Event) {
    switch (event.status) {
      case AppointmentState.pending:
        return "pink";
      case AppointmentState.cancelled:
        return "black";
      case AppointmentState.finished:
        return "green";
      case AppointmentState.approved:
        return "primary";
      case AppointmentState.rejected:
        return "red";
      default:
        return "primary";
    }
  }

  makeLocalTime(isoString: string) {
    const now = new Date(isoString);
    return `${now.getHours() < 10 ? "0" : ""}${now.getHours()}:${
      now.getMinutes() < 10 ? "0" : ""
    }${now.getMinutes()}`;
  }

  viewDay(ref: CalendarReference) {
    this.focus = ref.date;
    this.type = "day";
  }

  async appointmentAction(callback: () => void) {
    await callback();
    this.showAppointmentDetails = false;
  }
}
</script>
