<template>
    <div class="home pa-5">

        <br>
        <div class="d-flex justify-space-between mb-6">
            <h1>Predavanja</h1>
            <v-btn color="primary" @click="dialog=true">
                Dodaj novo predavanje
            </v-btn>
        </div>
        <br>

        <v-data-table :headers="stupci" :items="lectures" :loading="ucitavam" style="background-color: #A1887F">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteLecture(item.id)">Izbriši</v-btn>
            </template>

        </v-data-table>
<!--
        <v-btn color="primary" @click="getLectures()"> Dohvati predavanja </v-btn>
-->

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
                            <span class="text-h5">Dodaj predavanje</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <div class="d-flex justify-space-around mb-6">
                                <v-date-picker v-model="forma.date"></v-date-picker>
                                <v-time-picker v-model="forma.time"></v-time-picker>
                                </div>
                                <v-text-field v-model="forma.classroom" placeholder="Unesi ucionicu"
                                              v-on:keyup.enter="addLecture()"></v-text-field>
                                <v-text-field v-model="forma.description"
                                              placeholder="predavanje iz predmeta -nazivpredmeta- održano -datum- u -sati-"
                                              v-on:keyup.enter="addLecture()"></v-text-field>
                                <v-autocomplete :items="subjects" item-text="name" item-value="id"
                                                v-model="forma.subject_id" placeholder="Predmet"></v-autocomplete>
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
                                @click="addLecture(); dialog = false"
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
    name: 'LecturesView',
    data() {
        return {
            snackbar: {
                model: false,
                color: '',
                text: ''
            },
            forma: {
                time: '',
                date: '',
                classroom: '',
                description: '',
                subject_id: '',
            },
            lectures: [],
            subjects: [],
            stupci: [
                {text: 'Opis predavanja', value: 'description'},
                {text: 'Vrijeme', value: 'time'},
                {text: 'Datum', value: 'date'},
                {text: 'Učionica', value: 'classroom'},
                {text: 'Predmet', value: 'subject.name'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
            dialog: false,
        }
    },

    created(){
        this.getSubjects();
        this.getLectures();
    },
    methods: {

        resetiraj: function (){
            alert(this.poruka)

            this.poruka = 'Test'
        },
        getLectures: function (){
            this.ucitavam = true;

            this.axios.get("http://localhost:8000/api/lectures/get").then((response) => {
                this.lectures = response.data

                this.snackbar.model = true;
                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno dohvaćena predavanja.';
            }).catch(() => {
                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dohvatu predavanja.';
            }).finally(() => {
                this.ucitavam = false;
            })
        },

        getSubjects: function () {
            this.axios.get('http://localhost:8000/api/subjects/get').then((response) => {
                this.subjects = response.data;
            })
        },

        addLecture: function (){
            this.axios.post('http://localhost:8000/api/lectures/add', this.forma).then(() => {
                this.getLectures()
            })
        },

        deleteLecture: function (id){
            this.axios.get('http://localhost:8000/api/lectures/delete/' + id).then(() => {
                this.getLectures()

                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Uspješno izbrisano predavanje.';
            })
        }
    },
}
</script>

