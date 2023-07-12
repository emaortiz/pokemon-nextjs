import { Card, Container, Grid } from '@nextui-org/react';
import { Layout } from '../../components/layouts';
import { Text, Image } from '@nextui-org/react';
import { NoFavorites } from '@/components/ui';
import { useEffect, useState } from 'react';
import { localFavorites } from '@/utils';
import { FavoritePokemons } from '../../components/pokemon';

const FavoritesPage = () => {
	
	const [favoritePokemons, setFavoritesPokemons] = useState<number[]>([]);
	
	useEffect(() => {
	  setFavoritesPokemons( localFavorites.pokemons );
	}, [])
	
	
  return (
	<Layout title="Pokemons Favoritos">
		
		{
			favoritePokemons.length === 0 
				? (<NoFavorites />)
				: (<FavoritePokemons pokemons={favoritePokemons} />)
		}
	</Layout>
  )
}

export default FavoritesPage;
