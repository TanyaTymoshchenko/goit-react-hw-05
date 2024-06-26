import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../movies-api';
import toast, { Toaster } from 'react-hot-toast';
import css from './MovieCast.module.css';

const notify = () => toast.error('Something wrong... Please, try again!');

export default function MovieCast() {
  const [castList, setCastList] = useState({});
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMoviesCredits() {
      setLoading(true);
      try {
        const data = await getMovieCredits(movieId);
        setCastList(data);
      } catch (error) {
        notify();
      } finally {
        setLoading(false);
      }
    }

    fetchMoviesCredits();
  }, [movieId]);
  return (
    <div>
      <ul className={css.castList}>
        {loading && <b>Loading actors...</b>}
        {castList.length > 0 &&
          castList.map(({ id, name, character, profile_path }) => (
            <li key={id} className={css.listItem}>
              <img
                className={css.image}
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : `https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg`
                }
                alt={name}
                width="200"
              />
              <p className={css.actorsName}>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
      </ul>
      <Toaster position="top-center" />
    </div>
  );
}