import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Header from '../layout/Header';
import NewClientTag from './NewClientTag';
import AddClientModal from './AddClientModal';
import ClientCard from './ClientCard';
import Loader from '../layout/Loader';

const Clients = () => {
    const [query, setQuery] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [modal, setModal] = useState(false);

    const auth = useSelector(state => state.firebase.auth);
    const clients = useSelector(state => state.firestore.ordered.clients);

    useFirestoreConnect([
        {
            collection: "clients",
            where: ['owner', '==', auth.uid],
            orderBy: ['name']
        }
    ]);

    useEffect(() => {
        if (query) {
            filterClients();
        }
    }, [query])

    const filterClients = () => {
        let currentList = [...clients];
            let filteredList = currentList.filter(client => client.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
            setFilteredClients(filteredList);
    }

    const checkDoubles = qry => {
        if (qry && clients.some(client => client.name.toLowerCase().indexOf(qry.toLowerCase()) !== -1)) {
            return true;
        }
    }

    const handleChange = e => {
        setQuery(e.target.value);
    };

    return (
        <>
        {!clients && <Loader />}
        <AddClientModal modal={modal} setModal={setModal} checkDoubles={checkDoubles}/>
        <div>
            <Header title="Clients" query={query} handleChange={handleChange} placeholder="Find client..." />
            <div className="section client-tag__list">
                <div className="client-tag-grid">
                    <NewClientTag txt="Client" setModal={setModal} />
                    {(clients && !query) ? 
                    clients.map(client => <ClientCard key={client.id} client={client}/>) : 
                    query ? 
                    filteredClients.map(client => <ClientCard key={client.id} client={client}/>) : 
                    null}
                </div>
            </div>
        </div>
        </>
    )
}

export default Clients;
