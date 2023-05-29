<template>
    <div class="pa-5">

        <br>
        <v-card-title>
            <span class="text-h5">Uredi profesora</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <label for="name">Ime</label> <br>
                <input type="text" v-model="model.prof.name" /> <br><br>
                <label for="surname">Prezime</label> <br>
                <input type="text" v-model="model.prof.surname" /> <br><br>
                <label for="title">Titula</label> <br>
                <input type="text" v-model="model.prof.title" /> <br><br>
                <label for="gender">Spol</label> <br>
                <v-autocomplete :items="genders" v-model="model.prof.gender"
                               :value="model.prof.gender"></v-autocomplete>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="blue-darken-1"
                    variant="text"
                    onclick="location.href = '/professors';"
            >
                Svi profesori
            </v-btn>
            <v-btn
                    color="primary"
                    variant="text"
                    @click="updateProf()"
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
    name: 'ProfessorEditView',
    data() {
        return {
            model: {
                prof: {
                    name: '',
                    surname: '',
                    title: '',
                    gender: '',
                }
            },
            genders: [
                {text: 'M', value: 'M'},
                {text: 'Ž', value: 'F'}
            ],
        }
    },
    mounted() {
        //console.log(this.$route.params.id)
        this.getProfData(this.$route.params.id);
    },

    methods: {
        getProfData(Id) {
            this.axios.get(`http://localhost:8000/api/professors/edit/${Id}`)
                .then((response) => {
                    console.log(response.data.prof);

                    this.model.prof = response.data.prof

                });
        },

        updateProf(Id) {
            this.axios.post(`http://localhost:8000/api/professors/edit/${Id}`, this.model.prof)
                .then((response) => {
                    console.log(response.data)

                    location.replace("/professors")
                });
        },
    }
}
</script>
