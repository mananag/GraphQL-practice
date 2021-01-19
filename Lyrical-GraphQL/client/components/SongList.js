import React, { Component } from 'react'
// import gql from 'graphql-tag'
import {useQuery, gql} from '@apollo/client'

function SongList() {
    const { loading, error, data } = useQuery(gql`
    {
        songs{
            id
            title
        }
    }
  `);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;


    return <ul className={'collection'}>
        {data.songs.map(({ id, title }) => (
            <li key={id} className={'collection-item'}>
                <p>
                    {title}
                </p>
            </li>
        ))}
    </ul>
    return ;
}

export default SongList