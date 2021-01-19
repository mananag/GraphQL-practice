import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";


import SongList from "./components/SongList";


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
});
const Root = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <SongList/>
            </div>
        </ApolloProvider>
    )
};

ReactDOM.render(
    <Root/>,
    document.querySelector('#root')
);
