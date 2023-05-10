<template>
    <div class="home pa-5">

        <v-data-table :headers="stupci" :items="ls" :loading="ucitavam">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteLs(item.id)">Izbriši</v-btn>
            </template>

        </v-data-table>

        <v-btn color="primary" @click="getLs()"> Dohvati prisustva </v-btn>

        <br><br>

        <v-text-field v-model="forma.lecture_id" placeholder="Unesi predavanje"
                      v-on:keyup.enter="addLs()"></v-text-field>
        <v-text-field v-model="forma.student_id" placeholder="Unesi studenta"
                      v-on:keyup.enter="addLs()"></v-text-field>

        <br><br>
        <v-btn color="primary" @click="addLs()">
            Dodaj prisustvo
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
            stupci: [
                {text: 'Lecture', value: 'lecture_id'},
                {text: 'Student', value: 'student_id'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
        }
    },

    created(){
        this.getLs();
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

