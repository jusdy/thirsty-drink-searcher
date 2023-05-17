import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { XCircleIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { setDrinks } from '@/store/main.slice';
import { IDrink } from '@/interfaces/drink.interface';
import { IStore } from '@/interfaces/store.interface';

const Home = () => {
  const [searchIndex, setSearchIndex] = useState('');
  const drinks = useSelector((state: IStore) => state.main.drinks);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const result = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
      );
      dispatch(setDrinks(result.data.drinks));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchIndex(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchIndex('');
  };

  const filteredDrinks = drinks.filter((drink: IDrink) =>
    drink.strDrink.toLowerCase().includes(searchIndex.toLowerCase())
  );

  return (
    <>
      <header className='w-full text-center text-xl font-bold py-3 border-b-2 border-stone-300'>
        Thirsty
      </header>

      <main className='w-full max-w-[500px] mx-auto'>
        <div className='p-2.5 border-b border-stone-300'>
          <div className='relative'>
            <div className='absolute h-full flex items-center top-0 left-2 text-stone-500'>
              <MagnifyingGlassIcon className='w-6 h-6' />
            </div>

            <input
              value={searchIndex}
              onChange={handleInputChange}
              className='rounded-xl bg-stone-200/60 outline-none w-full py-2 px-9'
              placeholder='Find a drink'
            />

            {searchIndex && (
              <div
                className='absolute h-full flex items-center top-0 right-2 text-stone-500'
                onClick={handleClearSearch}
              >
                <XCircleIcon className='w-6 h-6' />
              </div>
            )}
          </div>
        </div>

        {filteredDrinks.map((drink: IDrink) => (
          <Link
            key={drink.idDrink}
            href={`/detail/${drink.idDrink}`}
            className='flex items-center p-2.5 border-b border-stone-200'
          >
            <img
              alt='drink-thumbnail'
              src={drink.strDrinkThumb}
              className='w-10 rounded-full mr-[15px]'
            />
            {drink.strDrink}
            <ChevronRightIcon className='w-4 h-4 ml-auto mr-3 text-stone-400' />
          </Link>
        ))}
      </main>
    </>
  );
};

export default Home;
