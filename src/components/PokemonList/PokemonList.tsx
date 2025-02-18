import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const navigate = useNavigate();
  const { pokemonId } = useParams(); // Get the pokemonId from the URL

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);

  // Fetch detailed data for selected Pokémon using the ID
  const { pokemonDetails, loading: detailLoading } = useGetPokemonDetails(
    pokemonId || '',
    selectedPokemon?.name || ''
  );

  useEffect(() => {
    if (pokemonId && pokemonDetails) {
      // Find the selected Pokémon from the list by its ID
      const pokemon = pokemons.find((pkmn) => pkmn.id === pokemonId);
      setSelectedPokemon(pokemon || null); // Set the selected Pokémon
    }
  }, [pokemonId, pokemons, pokemonDetails]); // Ensure effect runs when pokemonId or pokemonDetails changes

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleItemClick = (pokemon: any) => {
    navigate(`/pokemon/${pokemon.id}`);
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
    navigate('/pokemon');
  };

  const filteredPokemon = pokemons.filter((pkmn) =>
    pkmn.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchQuery}
        onChange={handleSearchChange}
        className={classes.searchInput}
      />
      {loading && <div>Loading...</div>}

      {filteredPokemon.map((pkmn) => (
        <div
          key={pkmn.id}
          className={classes.listItem}
          onClick={() => handleItemClick(pkmn)}
        >
          <img
            src={pkmn.image}
            alt={pkmn.name}
            className={classes.pokemonImage}
          />
          <div className={classes.nameAndTypes}>
            <div className={classes.name}>{pkmn.name}</div>
            <div className={classes.types}>{pkmn.types?.join(', ')}</div>
          </div>
          <div className={classes.number}>#{pkmn.number}</div>
        </div>
      ))}

      {/* Modal for selected Pokémon */}
      {selectedPokemon && pokemonId && !detailLoading && pokemonDetails && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <h2>{selectedPokemon.name}</h2>
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className={classes.modalImage}
            />
            <p>Types: {selectedPokemon.types?.join(', ')}</p>
            <p>Number: #{selectedPokemon.number}</p>
            <p>Classification: {pokemonDetails.classification}</p>
            <p>Resistance: {pokemonDetails.resistant?.join(', ')}</p>
            <p>MaxHP: {pokemonDetails.maxHP}</p>
            <button onClick={handleCloseModal} className={classes.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
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
      cursor: 'pointer',
      transition: 'transform 0.3 ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      },
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
      flex: 1,
    },
    name: {
      fontWeight: 'bold',
      fontSize: '1.2rem',
    },
    types: {
      fontSize: '1rem',
      color: '#bbb',
    },
    number: {
      textAlign: 'right',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      padding: '20px',
    },
    searchInput: {
      width: '100%',
      padding: '10px',
      marginBottom: '20px',
      fontSize: '1rem',
      border: '1px solid black',
      borderRadius: '8px',
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'center',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      width: '300px',
      maxWidth: '90%',
      '& h2': {
        color: 'black',
      },
      '& p': {
        color: 'black',
      },
    },
    modalImage: {
      width: '100%',
      height: 'auto',
      marginBottom: '10px',
    },
    closeButton: {
      padding: '10px 20px',
      marginTop: '20px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#d32f2f',
      },
    },
  },
  { name: 'PokemonList' }
);
