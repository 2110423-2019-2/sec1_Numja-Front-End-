<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-container fluid style="width: 75%">
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon @click="fetchAppointments">mdi-refresh</v-icon>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :now="today"
            type="month"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
        </v-sheet>
      </v-container>
      <v-dialog v-model="showAppointmentDetails" max-width="600px">
        <v-card>
          <v-card-title>Appointment Details</v-card-title>
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
  Event
} from "../types";

@Component
export default class AppointmentPage extends Vue {
  @Action(LoginActions.protectedRedirect)
  private protectedRedirect!: () => void;

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

  private showAppointmentDetails: boolean = true;

  @Getter(LoginGetters.getUser) private myUser!: User;

  mounted() {
    this.protectedRedirect();
    this.fetchAppointments();
    this.fetchUsers();
  }

  private today: string = this.formattedTodayDate;
  private focus: string = this.formattedTodayDate;
  private start: CalendarReference | null = null;
  private end: CalendarReference | null = null;
  private selectedEvent!: Event;
  private selectedElement: any = null;
  private selectedOpen: boolean = false;
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

  showEvent(event: CalendarEventReference) {
    console.log(event);
  }

  getEventColor(event: Event) {
    return "primary";
  }
}
</script>
