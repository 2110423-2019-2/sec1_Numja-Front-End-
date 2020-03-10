<template>
  <v-data-table
    :headers="headers"
    :items="teachers"
    class="elevation-1"
    item-key="name"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title> Verify Teacher </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.surname"
                      label="surname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.time"
                      label="time (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.link"
                      label="link"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.verify"
                      label="verify (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
    </template>
    <template v-slot:item.action="{ item }">
      <!-- <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon> -->

      <v-btn
        :v-show="item.verify == 'verified'"
        color="primary"
        dark
        class="mb-2"
        @click="verifyTeacher(item)"
        >verify</v-btn
      >
      <!-- <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon> -->
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    search: "",
    surname: "",
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name"
      },
      { text: "Surname", value: "surname" },
      { text: "TimeSent", value: "time" },
      { text: "Link", value: "link" },
      { text: "Status", value: "verify" },
      { text: "Actions", value: "action", sortable: false }
    ],
    teachers: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      surname: 0,
      time: 0,
      link: 0,
      verify: 0
    },
    defaultItem: {
      name: "",
      surname: 0,
      time: 0,
      link: 0,
      verify: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    verifyTeacher(item) {
      alert(item);
    },
    initialize() {
      this.teachers = [
        {
          name: "Mr.Frozen",
          surname: "EsiGu",
          time: "-",
          link: "-",
          verify: "Unverified"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.teachers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.teachers.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.teachers.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.teachers[this.editedIndex], this.editedItem);
      } else {
        this.teachers.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
