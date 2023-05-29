<template>
    <div class="pa-5">

        <br>
        <div class="d-flex justify-space-between mb-6">
            <h1>Studenti</h1>
            <v-btn color="primary" @click="dialog=true">
                Dodaj novog studenta
            </v-btn>
        </div>
        <br>

        <v-data-table :headers="stupci" :items="students" :loading="ucitavam" style="background-color: #A1887F">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#"
                       @click="deleteStudent(item.id)">Izbriši</v-btn>
                <v-btn color="primary" class="white--text" small
                       :href="'/students/edit/' + item.id">Uredi</v-btn>

                <v-dialog
                    v-model="edit"
                    persistent
                    width="1024"
                >
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Uredi studenta</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-text-field v-model="item.id"
                                ></v-text-field>
                                   <v-text-field v-model="item.name"
                                             ></v-text-field>
                                <v-text-field v-model="item.student_number"
                                             ></v-text-field>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue-darken-1"
                                variant="text"
                                @click="edit = false"
                            >
                                Zatvori
                            </v-btn>
                            <v-btn
                                color="primary"
                                variant="text"
                                @click="editStudent(item.id); edit = false"
                            >
                                Uredi
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>

        </v-data-table>

        <!--<v-btn color="primary" @click="getStudents()"> Dohvati studente </v-btn>-->

        <br><br>

        <v-snackbar
                v-model="snackbar.model" right top
                :color="snackbar.color"
                timeout="3000"
        >
            {{ snackbar.text }}
        </v-snackbar>

        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog"
                    persistent
                    width="1024"
                >
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">Dodaj studenta</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-text-field v-model="forma.name" placeholder="Unesi ime"></v-text-field>
                                <v-text-field v-model="forma.student_number" placeholder="Unesi broj ineksa"
                                              v-on:keyup.enter="addStudent(); dialog=false"></v-text-field>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="blue-darken-1"
                                variant="text"
                                @click="dialog = false"
                            >
                                Zatvori
                            </v-btn>
                            <v-btn
                                color="primary"
                                variant="text"
                                @click="addStudent(); dialog = false"
                            >
                                Dodaj
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

    </div>
</template>

<script>

export default {
    name: 'StudentsView',
    data() {
        return {
            snackbar: {
                model: false,
                color: '',
                text: ''
            },
            poruka: 'Test',
            forma: {
                name: '',
                username: '',
                student_number: '',
            },
            students: [],
            stupci: [
                {text: 'Ime', value: 'name'},
                {text: 'Broj indeksa', value: 'student_number'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
            dialog: false,
            edit: false,
        }
    },

    created(){
        this.getStudents();
    },
    methods: {

        resetiraj: function (){
            alert(this.poruka)

            this.poruka = 'Test'
        },
        getStudents: function (){
            this.ucitavam = true;

            this.axios.get("http://localhost:8000/api/students/get").then((response) => {
                this.students = response.data

                this.snackbar.model = true;
                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno dohvaćeni studenti.';
            }).catch(() => {
                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dohvatu studenta.';
            }).finally(() => {
                this.ucitavam = false;
            })
        },

        addStudent: function (){
            this.axios.post('http://localhost:8000/api/students/add', this.forma).then(() => {
                this.getStudents()
            })
        },

        deleteStudent: function (id){
            this.axios.get('http://localhost:8000/api/students/delete/' + id).then(() => {
                this.getStudents()

                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Uspješno izbrisan student.';
            })
        },

        editStudent: function (id){
            this.axios.get('http://localhost:8000/api/students/edit/' + id).then(() => {
                this.getStudents()

                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Uspješno uređen student.';
            })
        }
    },
}
</script>

