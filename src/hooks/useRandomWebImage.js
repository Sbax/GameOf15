import {useState} from 'react';
import {REACT_APP_UNSPLASH_API} from 'react-native-dotenv';

const apiKey = REACT_APP_UNSPLASH_API;
const unsplashApiUrl = 'https://api.unsplash.com';
const randomImageUrl = `${unsplashApiUrl}/photos/random`;

export default function useRandomWebImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [image, setImage] = useState();

  const getRandomWebImage = async () => {
    setError(null);
    setImage(null);

    setLoading(true);

    (await fetch(`${randomImageUrl}?&orientation=squarish&client_id=${apiKey}`))
      .json()
      .catch(error => {
        setError(error);
      })
      .then(({errors, urls}) => {
        if (errors) {
          setError(errors);
          return;
        }

        setImage({uri: urls.regular});
      })
      .finally(() => setLoading(false));
  };

  return [
    {
      image,
      error,
      loading,
    },
    getRandomWebImage,
  ];
}
