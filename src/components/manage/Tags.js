import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Header from '../layout/Header';
import NewClientTag from './NewClientTag';
import AddTagModal from './AddTagModal';
import TagCard from './TagCard';
import Loader from '../layout/Loader';

const Tags = () => {
    const [query, setQuery] = useState('');
    const [filteredTags, setFilteredTags] = useState([]);
    const [modal, setModal] = useState(false);
    
    const auth = useSelector(state => state.firebase.auth);
    const tags = useSelector(state => state.firestore.ordered.tags);

    useFirestoreConnect([
        {
            collection: "tags",
            where: ['owner', '==', auth.uid],
            orderBy: ['name']
        }
    ]);

    useEffect(() => {
        if (query) {
            filterTags();
        }   
    }, [query])

    const filterTags = () => {
            let currentList = [...tags];
            let filteredList = currentList.filter(tag => tag.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
            setFilteredTags(filteredList);
    }

    const handleChange = e => {
        setQuery(e.target.value);
    }

    const checkDoubles = qry => {
        if (qry && tags.some(tag => tag.name.toLowerCase().indexOf(qry.toLowerCase()) !== -1)) {
            return true;
        }
    }

    return (
        <>
        {!tags && <Loader />}
        <AddTagModal modal={modal} setModal={setModal} checkDoubles={checkDoubles} />
        <div>
            <Header title="Tags" query={query} handleChange={handleChange} placeholder="Find tag..."/>
            <div className="section client-tag__list">
                <div className="client-tag-grid">
                    <NewClientTag txt="Tag" setModal={setModal} />
                    {(tags && !query) ?
                     tags.map(tag => <TagCard key={tag.id} tag={tag} />) :
                     query ?
                     filteredTags.map(tag => <TagCard key={tag.id} tag={tag}/>) :
                     null }
                </div>
            </div>
        </div>
        </>
    )
}

export default Tags;
