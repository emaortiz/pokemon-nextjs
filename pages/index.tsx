import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/layouts/Layout';
import { Button, Card, Grid, Text, Row, Image } from '@nextui-org/react';
import pokeApi from '../api/pokeApi';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon'


interface Props {
  pokemons: SmallPokemon[];
}

const Home: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de pokemons'>


      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={ pokemon.id } pokemon={pokemon} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

// Siempre y cuando podamos saber (de antemano) que es lo que vamos a recibir
// buildtime solo se ejecuta una sola ves
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default Home;