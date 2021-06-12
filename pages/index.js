import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import SearchInput from '../components/SearchInput/SearchInput';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import { useState } from 'react';

import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';

import GitHubIcon from '@material-ui/icons/GitHub';
import Link from 'next/link';

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};
NProgress.configure({ showSpinner: false });

Router.onRouteChangeComplete = () => NProgress.done();

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState('');

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css'
          integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=='
          crossorigin='anonymous'
          referrerpolicy='no-referrer'
        />
      </Head>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placeholder='Filter by Name, Region or SubRegion'
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />

      <Link href='https://github.com/chaitanyashimpi/world-ranks'>
        <div className={styles.github}>
          <GitHubIcon />
        </div>
      </Link>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  return {
    props: {
      countries,
    },
  };
};
