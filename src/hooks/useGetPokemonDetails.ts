import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type PokemonDetails = {
  id: string;
  number: number;
  name: string;
  weight: { minimum: string; maximum: string };
  height: { minimum: string; maximum: string };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
};

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (id: string, name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id, name },
  });

  const pokemonDetails: PokemonDetails | null = useMemo(
    () => data?.pokemon || null,
    [data]
  );

  return {
    pokemonDetails,
    ...queryRes,
  };
};
