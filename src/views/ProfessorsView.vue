<template>
    <div class="home pa-5">

        <v-data-table :headers="stupci" :items="profs" :loading="ucitavam">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteProf(item.id)">Izbriši</v-btn>
            </template>

        </v-data-table>

        <v-btn color="primary" @click="getProfs()"> Dohvati profesore </v-btn>

        <br><br>

        <v-text-field v-model="forma.name" placeholder="Unesi ime"
                      v-on:keyup.enter="addProf()"></v-text-field>
        <v-text-field v-model="forma.username" placeholder="Unesi email"
                      v-on:keyup.enter="addProf()"></v-text-field>
        <v-text-field v-model="forma.password" placeholder="Unesi lozinku"
                      v-on:keyup.enter="addProf()"></v-text-field>
        <v-text-field v-model="forma.user_type" placeholder="Unesi tip korisnika"
                      v-on:keyup.enter="addProf()"></v-text-field>

        <br><br>
        <v-btn color="primary" @click="addProf()">
            Dodaj profesora
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
    name: 'ProfessorsView',
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
                password: '',
                user_type: '',
            },
            profs: [],
            stupci: [
                {text: 'Name', value: 'name'},
                {text: 'Username', value: 'username'},
                {text: 'Password', value: 'password'},
                {text: 'Type of user', value: 'user_type'},
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

