import Head from "next/head";

export default function CustomHead() {
  return (
    <Head>
      <title>My Application</title>
      <meta name="description" content="This is my application" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
