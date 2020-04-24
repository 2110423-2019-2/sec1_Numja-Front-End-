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
            <template v-slot:actions>
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
                >change</v-btn
              >
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
              :value="selectedEvent ? makeLocalTime(selectedEvent.endTime) : ''"
              readonly
            ></v-text-field>
            <v-text-field
              label="price"
              prepend-icon="mdi-cash"
              :value="selectedEvent ? selectedEvent.price : ''"
              readonly
              suffix="baht"
            ></v-text-field>
            <v-textarea
              class="pl-6"
              outlined
              name="location"
              label="location"
              readonly
              :value="selectedEvent ? selectedEvent.location : ''"
            ></v-textarea>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
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
  AppointmentState
} from "../types";

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

  @Action(AppointmentActions.fetchAppointments)
  private fetchAppointments!: () => void;
  @Action(UsersActions.fetchUsers)
  private fetchUsers!: () => void;

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
        return "black";
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
