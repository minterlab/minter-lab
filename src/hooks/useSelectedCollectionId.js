import { useEffect } from "react";
import { useMinterLabStore } from "./useMinterLabStore";
import { getCollectionById } from '../utils/db'

export function useSelectedCollectionId() {
    const selectedCollectionId = useMinterLabStore(state => state.selectedCollectionId);
    const setSelectedCollectionId_store = useMinterLabStore(state => state.setSelectedCollectionId);
    const setSelectedCollection = useMinterLabStore(state => state.setSelectedCollection);

    useEffect(() => {

        getCollectionById(selectedCollectionId).then((collection) => {
            setSelectedCollection(collection);
        })



        // return (() => {
        //     console.log('unmounting...' + selectedCollectionId);
        //     // localStorage.setItem('selectedCollectionId', selectedCollectionId);
        // })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCollectionId]);


    function setSelectedCollectionId(id) {
        // localStorage.setItem('selectedCollectionId', id)
        setSelectedCollectionId_store(id)
    }


    return [selectedCollectionId, setSelectedCollectionId];
}