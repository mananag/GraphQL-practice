// const _ = require('lodash')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = require("graphql");
const axios = require('axios')
const {GraphQLNonNull} = require("graphql");

const CompanyType = new GraphQLObjectType({
    name : 'Company',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/company/${parentValue.id}/user`)
                    .then(res => res.data)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type : CompanyType,
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/company/${parentValue.companyId}`)
                    .then(res => res.data)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValues, args) {
                // return _.find(users, {id: args.id})
                return axios.get(`http://localhost:3000/user/${args.id}`)
                    .then(response => response.data)
            }
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLString}},
            resolve(parentValues, args) {
                // return _.find(users, {id: args.id})
                return axios.get(`http://localhost:3000/company/${args.id}`)
                    .then(response => response.data)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName : { type: new GraphQLNonNull(GraphQLString)  },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age }) {
                return axios.post(`http://localhost:3000/user`, { firstName, age })
                    .then(res => res.data)
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.delete(`http://localhost:3000/user/${id}`)
                    .then(res => res.data)
            }
        },
        updateUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: {type: GraphQLString},
                age: {type: GraphQLInt},
                companyId: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:3000/user/${args.id}`, args)
                    .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})