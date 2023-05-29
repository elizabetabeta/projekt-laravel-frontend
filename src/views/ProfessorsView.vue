<template>
    <div class="pa-5">
        <br>
        <div class="d-flex justify-space-between mb-6">
        <h1>Profesori</h1>
        <v-btn color="primary" @click="dialog=true">
            Dodaj novog profesora
        </v-btn>
        </div>
        <br>
        <v-data-table :headers="stupci" :items="profs" :loading="ucitavam" style="background-color: #A1887F">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteProf(item.id)">Izbriši</v-btn>
                <v-btn color="primary" class="white--text" small
                       :href="'/professors/edit/' + item.id">Uredi</v-btn>
            </template>

        </v-data-table>

        <!--<v-btn color="primary" @click="getProfs()"> Dohvati profesore </v-btn>-->

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
                            <span class="text-h5">Dodaj profesora</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-text-field v-model="forma.name" placeholder="Unesi ime"
                                              v-on:keyup.enter="addProf()"></v-text-field>
                                <v-text-field v-model="forma.surname" placeholder="Unesi prezime"
                                              v-on:keyup.enter="addProf()"></v-text-field>
                                <v-text-field v-model="forma.title" placeholder="Unesi titulu"
                                              v-on:keyup.enter="addProf()"></v-text-field>
                                <v-autocomplete :items="genders" v-model="forma.gender"
                                                placeholder="Spol"></v-autocomplete>
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
                                @click="addProf(); dialog = false"
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
    name: 'ProfessorsView',
    data() {
        return {
            snackbar: {
                model: false,
                color: '',
                text: ''
            },
            dialog: false,
            poruka: 'Test',
            forma: {
                name: '',
                surname: '',
                title: '',
                gender: '',
            },
            profs: [],
            genders: [
                {text: 'M', value: 'M'},
                {text: 'Ž', value: 'F'}
            ],
            stupci: [
                {text: 'Ime', value: 'name'},
                {text: 'Prezime', value: 'surname'},
                {text: 'Titula', value: 'title'},
                {text: 'Spol', value: 'gender'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
        }
    },

    created(){
        this.getProfs();
    },
    methods: {

        resetiraj: function (){
            alert(this.poruka)

            this.poruka = 'Test'
        },
        getProfs: function (){
            this.ucitavam = true;

            this.axios.get("http://localhost:8000/api/professors/get").then((response) => {
                this.profs = response.data

                this.snackbar.model = true;
                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno dohvaćeni profesori.';
            }).catch(() => {
                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dohvatu profesora.';
            }).finally(() => {
                this.ucitavam = false;
            })
        },

        addProf: function (){
            this.axios.post('http://localhost:8000/api/professors/add', this.forma).then(() => {
                this.getProfs()
            })
        },

        deleteProf: function (id){
            this.axios.get('http://localhost:8000/api/professors/delete/' + id).then(() => {
                this.getProfs()

                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Uspješno izbrisan profesor.';
            })
        }
    },
}
</script>

