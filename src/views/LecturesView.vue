<template>
    <div class="home pa-5">

        <v-data-table :headers="stupci" :items="lectures" :loading="ucitavam">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteLecture(item.id)">Izbriši</v-btn>
            </template>

        </v-data-table>

        <v-btn color="primary" @click="getLectures()"> Dohvati predavanja </v-btn>

        <br><br>

        <v-text-field v-model="forma.time" placeholder="Unesi vrijeme"
                      v-on:keyup.enter="addLecture()"></v-text-field>
        <v-text-field v-model="forma.date" placeholder="Unesi datum"
                      v-on:keyup.enter="addLecture()"></v-text-field>
        <v-text-field v-model="forma.classroom" placeholder="Unesi ucionicu"
                      v-on:keyup.enter="addLecture()"></v-text-field>
        <v-text-field v-model="forma.subject_id" placeholder="Unesi predmet"
                      v-on:keyup.enter="addLecture()"></v-text-field>

        <br><br>
        <v-btn color="primary" @click="addLecture()">
            Dodaj predavanje
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
    name: 'LecturesView',
    data() {
        return {
            snackbar: {
                model: false,
                color: '',
                text: ''
            },
            poruka: 'Test',
            forma: {
                time: '',
                date: '',
                classroom: '',
                subject_id: '',
            },
            lectures: [],
            stupci: [
                {text: 'Time', value: 'time'},
                {text: 'Date', value: 'date'},
                {text: 'Classroom', value: 'classroom'},
                {text: 'Subject', value: 'subject_id'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
        }
    },

    created(){
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

