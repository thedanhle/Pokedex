import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      {pokemons.map((pkmn) => (
        <div key={pkmn.id} className={classes.listItem}>
          <img src={pkmn.image} alt={pkmn.name} className={classes.pokemonImage}></img>
          <div className={classes.nameAndTypes}>
            <div className={classes.name}>{pkmn.name}</div>
            <div className={classes.types}>{pkmn.types?.join(', ')}</div>
          </div>
          <div className={classes.number}>#{pkmn.number}</div>
        </div>
      ))}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    listItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '15px',
      padding: '10px 0',
      borderBottom: '0.5px solid rgba(255, 255, 255, 0.35)',
      justifyContent: 'space-between',
      transition: 'transform 0.3 ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)'
      }
    },
    pokemonImage: {
      width: '10%',
      height: '10%',
      objectFit: 'cover',
    },
    nameAndTypes: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      textAlign: 'left',
      flex: 1
    },
    name: {
      fontWeight: 'bold',
      fontSize: '1.2rem'
    },
    types: {
      fontSize: '1rem',
      color: '#bbb'
    },
    number: {
      textAlign: 'right',
      fontSize: '1.2rem',
      fontWeight: 'bold'
    }
  },
  { name: 'PokemonList' }
);
