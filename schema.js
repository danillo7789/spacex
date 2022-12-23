const axios = require('axios');

const { 
    GraphQLObjectType,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

//Lauch Type
const LaunchType = new GraphQLObjectType ({
    name: 'Launch',
    fields: () => ({
        flight_number : { type: GraphQLInt },
        mission_name : { type: GraphQLString },
        launch_year : { type: GraphQLString },
        launch_date_local : { type: GraphQLString },
        launch_success : { type: GraphQLBoolean },
        rocket : { type: RocketType } // is the object below
    })
});

//Rocket Type
const RocketType = new GraphQLObjectType ({
    name: 'Rocket',
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
})

//Root Query
const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve (parent, args) {
                return axios.get('https://api.spacexdata.com/v3/launches/', {
                    headers: {"Accept-Encoding": "gzip, deflate, compress"}
                }).then(res => res.data);
            }
        },
        launch: {
            type: LaunchType,
            args: {
                flight_number: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`, {
                    headers: {"Accept-Encoding": "gzip, deflate, compress"}
                }).then(res => res.data)
            }
        },

        rockets: {
            type: new GraphQLList(RocketType),
            resolve (parent, args) {
                return axios.get('https://api.spacexdata.com/v3/rockets', {
                    headers: {"Accept-Encoding": "gzip, deflate, compress"}
                }).then(res => res.data);
            }
        },
        rocket: {
            type: RocketType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`, {
                    headers: {"Accept-Encoding": "gzip, deflate, compress"}
                }).then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    "query": RootQuery
});