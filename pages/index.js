import axios from 'axios';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import arrow from '../assets/icon-arrow.svg';
import bg from '../assets/pattern-bg.png';
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
});

const AppContainer = styled.div`
    /* display: flex;
  min-width: 100vw;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
    display: block;
`;

const Header = styled.header`
    position: relative;
    width: 100%;
    height: 50%;
    padding: 1rem;
    text-align: center;
    z-index: 100;
    .HeaderBackground {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    padding: 1rem 0;
    color: white;
    z-index: 100;
    position: relative;
`;

const InputDiv = styled.div`
    max-width: 500px;
    height: 3rem;
    margin: 0 auto;
    display: flex;
    transform: translateY(60%);
    z-index: 100;
    -webkit-box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.43);
    box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.43);

    input {
        width: 90%;
        padding: 1rem 0;
        padding-left: 1rem;
        border-radius: 10px 0 0 10px;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1.1rem;
        letter-spacing: 0.05rem;
    }
    button {
        width: 10%;
        border: none;
        background-color: black;
        height: 100%;
        padding: 0rem 1.5rem;
        padding-left: 1.3rem;
        border-radius: 0 10px 10px 0;
        outline: none;
        cursor: pointer;
        img {
            border-radius: 0 10px 10px 0;
            background-color: black;
        }
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Info = styled.div`
    max-width: 1000px;
    z-index: 100;

    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.5rem 1rem;
    background-color: #333;
    color: #ddd;
    border-radius: 10px;
    transform: translateY(50%);
    -webkit-box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.43);
    box-shadow: 5px 5px 15px 2px rgba(0, 0, 0, 0.43);
    @media (max-width: 500px) {
        flex-direction: column;
        transform: translateY(20%);
    }
`;
const InfoCard = styled.div`
    width: 25%;
    text-align: start;
    padding: 1rem;
    word-wrap: break-word;
    border-right: 1px solid #888;
    z-index: 1000;
    @media (max-width: 500px) {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #888;
    }
    &:last-child {
        border: none;
    }
    h5 {
        font-weight: bold;
        font-size: 1rem;
        text-transform: uppercase;
        color: #888;
        padding-bottom: 1rem;
    }
    h1 {
        font-size: 1.5rem;
    }
`;

export default function Home() {
    const [data, setData] = useState(null);
    const [input, setInput] = useState('');
    const getLocation = () => {
        axios
            .get(
                `https://geo.ipify.org/api/v1?apiKey=at_xaFlcoRvMfiEverqc3zBiG2B8Ca6z&ipAddress=${input}`
            )
            .then((res) => setData(res.data));
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            axios
                .get(
                    'https://geo.ipify.org/api/v1?apiKey=at_xaFlcoRvMfiEverqc3zBiG2B8Ca6z'
                )
                .then((res) => setData(res.data));
        }
    }, []);
    return (
        <>
            <Head>
                <title>IP Address Lookup</title>
                <meta name='description' content='IP Address Lookup' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <AppContainer>
                <Header>
                    <Image className='HeaderBackground' src={bg} fill></Image>
                    <Title>IP Address Lookup</Title>
                    <InputDiv>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type='text'
                            placeholder='Search for any IP address or domain'
                        />
                        <button onClick={getLocation}>
                            <Image src={arrow} alt='' />
                        </button>
                    </InputDiv>
                    {data && (
                        <Info>
                            <InfoCard>
                                <h5>ip address</h5>
                                <h1>{data.ip}</h1>
                            </InfoCard>
                            <InfoCard>
                                <h5>location</h5>
                                <h1>
                                    {data.location.city} {data.location.country}{' '}
                                    {data.location.postalCode}
                                </h1>
                            </InfoCard>
                            <InfoCard>
                                <h5>timezone</h5>
                                <h1>{data.location.timezone}</h1>
                            </InfoCard>
                            <InfoCard>
                                <h5>isp</h5>
                                <h1>{data.isp}</h1>
                            </InfoCard>
                        </Info>
                    )}
                </Header>
                {data && <Map data={data}></Map>}
            </AppContainer>
        </>
    );
}
