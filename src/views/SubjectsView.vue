<template>
    <div class="home pa-5">

        <br>
        <div class="d-flex justify-space-between mb-6">
            <h1>Predmeti</h1>
            <v-btn color="primary" @click="dialog=true">
                Dodaj novi predmet
            </v-btn>
        </div>
        <br>


        <v-data-table :headers="stupci" :items="subjects" :loading="ucitavam" style="background-color: #A1887F">

            <template v-slot:[`item.professor.name`]="{ item }">
                <span>{{ item.professor.name }} {{ item.professor.surname }}</span>
            </template>

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteSubject(item.id)">Izbriši</v-btn>
            </template>

        </v-data-table>

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
                            <span class="text-h5">Dodaj predmet</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-text-field v-model="forma.name" placeholder="Unesi ime"
                                              v-on:keyup.enter="addSubject()"></v-text-field>
                                <v-text-field v-model="forma.description" placeholder="Unesi opis"
                                              v-on:keyup.enter="addSubject()"></v-text-field>
                                <v-autocomplete :items="professors"
                                                :item-text="item => item.name + ' ' + item.surname "
                                                item-value="id"
                                                v-model="forma.professor_id"
                                                placeholder="Izaberi profesora"></v-autocomplete>
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
                                @click="addSubject(); dialog = false"
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
    name: 'SubjectsView',
    data() {
        return {
            snackbar: {
                model: false,
                color: '',
                text: ''
            },
            forma: {
                name: '',
                description: '',
                professor_id: '',
            },
            subjects: [],
            professors: [],
            stupci: [
                {text: 'Naziv', value: 'name'},
                {text: 'Opis', value: 'description'},
                {text: 'Ime profesora', value: 'professor.name'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
            dialog: false,
        }
    },

    created(){
        this.getProfessors();
        this.getSubjects();
    },
    methods: {

        resetiraj: function (){
            alert(this.poruka)

            this.poruka = 'Test'
        },
        getSubjects: function (){
            this.ucitavam = true;

            this.axios.get("http://localhost:8000/api/subjects/get").then((response) => {
                this.subjects = response.data

                this.snackbar.model = true;
                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno dohvaćeni predmeti.';
            }).catch(() => {
                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dohvatu predmeta.';
            }).finally(() => {
                this.ucitavam = false;
            })
        },

        getProfessors: function () {
            this.axios.get('http://localhost:8000/api/professors/get').then((response) => {
                this.professors = response.data;
            })
        },

        addSubject: function (){
            this.axios.post('http://localhost:8000/api/subjects/add', this.forma).then(() => {
                this.getSubjects()
                this.getProfessors()
            })
        },

        deleteSubject: function (id){
            this.axios.get('http://localhost:8000/api/subjects/delete/' + id).then(() => {
                this.getSubjects()
                this.getProfessors()

                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Uspješno izbrisan predmet.';
            })
        }
    },
}
</script>

