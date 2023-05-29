<template>
    <div class="home pa-5">

        <br>
        <div class="d-flex justify-space-between mb-6">
            <h1>Prisustva</h1>
            <v-btn color="primary" @click="dialog=true">
                Dodaj novo prisustvo
            </v-btn>
        </div>
        <br>

        <v-data-table :headers="stupci" :items="ls" :loading="ucitavam" style="background-color: #A1887F">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteLs(item.id)">Izbriši</v-btn>
            </template>

        </v-data-table>

       <!-- <v-btn color="primary" @click="getLs()"> Dohvati prisustva </v-btn> -->

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
                            <span class="text-h5">Dodaj prisustvo</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-autocomplete :items="lectures"
                                                :item-text="item => item.date +' - '+ item.time + ' - ' + item.description"
                                                item-value="id"
                                                v-model="forma.lecture_id" placeholder="Predavanje">
                                </v-autocomplete>
                                <v-autocomplete :items="students" item-text="name" item-value="id"
                                                v-model="forma.student_id" placeholder="Student"></v-autocomplete>
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
                                @click="addLs(); dialog = false"
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
    name: 'LecturesStudentsView',
    data() {
        return {
            snackbar: {
                model: false,
                color: '',
                text: ''
            },
            poruka: 'Test',
            forma: {
                lecture_id: '',
                student_id: '',
            },
            ls: [],
            lectures: [],
            students: [],
            stupci: [
                {text: 'Predavanje', value: 'lecture.description'},
                {text: 'Student', value: 'student.name'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
            dialog: false,
        }
    },

    created(){
        this.getLs();
        this.getStudents();
        this.getLectures();
        this.getSubjects();
    },
    methods: {

        resetiraj: function (){
            alert(this.poruka)

            this.poruka = 'Test'
        },
        getLs: function (){
            this.ucitavam = true;

            this.axios.get("http://localhost:8000/api/ls/get").then((response) => {
                this.ls = response.data

                this.snackbar.model = true;
                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno dohvaćena prisustva.';
            }).catch(() => {
                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dohvatu prisustva.';
            }).finally(() => {
                this.ucitavam = false;
            })
        },

        getLectures: function () {
            this.axios.get('http://localhost:8000/api/lectures/get').then((response) => {
                this.lectures = response.data;
            })
        },

        getStudents: function () {
            this.axios.get('http://localhost:8000/api/students/get').then((response) => {
                this.students = response.data;
            })
        },

        getSubjects: function () {
            this.axios.get('http://localhost:8000/api/subjects/get').then((response) => {
                this.subjects = response.data;
            })
        },

        addLs: function (){
            this.axios.post('http://localhost:8000/api/ls/add', this.forma).then(() => {
                this.getLs()
            })
        },

        deleteLs: function (id){
            this.axios.get('http://localhost:8000/api/ls/delete/' + id).then(() => {
                this.getLs()

                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Uspješno izbrisano prisustvo.';
            })
        }
    },
}
</script>

