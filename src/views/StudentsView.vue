<template>
    <div class="home pa-5">

        <v-data-table :headers="stupci" :items="students" :loading="ucitavam">

            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn color="red" class="white--text" small href="#" @click="deleteStudent(item.id)">Izbriši</v-btn>
            </template>

        </v-data-table>

        <v-btn color="primary" @click="getStudents()"> Dohvati studente </v-btn>

        <br><br>

        <v-text-field v-model="forma.name" placeholder="Unesi ime"
                      v-on:keyup.enter="addStudent()"></v-text-field>
        <v-text-field v-model="forma.student_number" placeholder="Unesi broj ineksa"
                      v-on:keyup.enter="addStudent()"></v-text-field>

        <br><br>
        <v-btn color="primary" @click="addStudent()">
            Dodaj studenta
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
                {text: 'Name', value: 'name'},
                {text: 'Student number', value: 'student_number'},
                {text: 'Akcije', value: 'akcije'}
            ],
            ucitavam: false,
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
        }
    },
}
</script>

