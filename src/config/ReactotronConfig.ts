import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: any;
  }
}

if (__DEV__) {
  const tron = Reactotron.configure()
    .connect();

  tron.clear!();

  // eslint-disable-next-line no-console
  console.tron = tron;
}
