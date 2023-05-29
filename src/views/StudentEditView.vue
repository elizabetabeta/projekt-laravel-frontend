<template>
    <div class="pa-5">

        <br>
            <v-card-title>
                <span class="text-h5">Uredi studenta</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <label for="name">Ime</label> <br>
                    <input type="text" v-model="model.student.name" /> <br><br>
                    <label for="student_number">Broj indeksa</label> <br>
                    <input type="text" v-model="model.student.student_number" />
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue-darken-1"
                    variant="text"
                    onclick="location.href = '/students';"
                >
                    Svi studenti
                </v-btn>
                <v-btn
                    color="primary"
                    variant="text"
                    @click="updateStudent()"
                >
                    Uredi
                </v-btn>
            </v-card-actions>

    </div>

</template>

<style>
    input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border-bottom: 2px solid darkblue;
    }
</style>
<script>
    export default {
        name: 'StudentEditView',
        data() {
            return {
                model: {
                    student: {
                        name: '',
                        student_number: '',
                    }
                },
            }
        },
        mounted() {
            //console.log(this.$route.params.id)
            this.getStudentData(this.$route.params.id);
        },

        methods: {
            getStudentData(studentId){
                this.axios.get(`http://localhost:8000/api/students/edit/${studentId}`)
                    .then((response) => {
                    console.log(response.data.student);

                    this.model.student = response.data.student

                });
            },

            updateStudent(studentId) {
                this.axios.post(`http://localhost:8000/api/students/edit/${studentId}`, this.model.student)
                    .then((response) => {
                        console.log(response.data)

                        location.replace("/students")
                    });
            },
        }
    }
</script>
