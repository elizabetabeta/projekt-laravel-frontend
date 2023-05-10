<template>
    <div class="home pa-5">

        <v-data-table :headers="stupci" :items="subjects" :loading="ucitavam">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteSubject(item.id)">Izbriši</v-btn>
            </template>

        </v-data-table>

        <v-btn color="primary" @click="getSubjects()"> Dohvati predmete </v-btn>

        <br><br>

        <v-text-field v-model="forma.name" placeholder="Unesi ime"
                      v-on:keyup.enter="addSubject()"></v-text-field>
        <v-text-field v-model="forma.description" placeholder="Unesi opis"
                      v-on:keyup.enter="addSubject()"></v-text-field>
        <v-text-field v-model="forma.professor_id" placeholder="Unesi id profesora"
                      v-on:keyup.enter="addSubject()"></v-text-field>

        <br><br>
        <v-btn color="primary" @click="addSubject()">
            Dodaj predmet
        </v-btn>



        <v-snackbar
                v-model="snackbar.model" right top
                :color="snackbar.color"
                timeout="3000"
        >
            {{ snackbar.text }}
        </v-snackbar>

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
            poruka: 'Test',
            forma: {
                name: '',
                description: '',
                professor_id: '',
            },
            subjects: [],
            stupci: [
                {text: 'Name', value: 'name'},
                {text: 'Description', value: 'description'},
                {text: 'Professor', value: 'professor_id'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
        }
    },

    created(){
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

        addSubject: function (){
            this.axios.post('http://localhost:8000/api/subjects/add', this.forma).then(() => {
                this.getSubjects()
            })
        },

        deleteSubject: function (id){
            this.axios.get('http://localhost:8000/api/subjects/delete/' + id).then(() => {
                this.getSubjects()

                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Uspješno izbrisan predmet.';
            })
        }
    },
}
</script>

