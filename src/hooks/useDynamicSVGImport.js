import { useEffect, useRef, useState } from "react";
import { chainMetadataByName } from './provideRainbowKitChains'

export function useDynamicSVGImport(name, options = {}) {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const { onCompleted, onError } = options;
    useEffect(() => {
        setLoading(true);
        const importIcon = async () => {
            try {
                // ImportedIconRef.current = (
                //     await import(`./chainIcons/${"polygon"}.svg`)
                // ).ReactComponent;
                // console.log(name);
                // ImportedIconRef.current = await chainMetadataByName[name].iconUrl()

                // ImportedIconRef.current = await chainMetadataByName[name].iconUrl()
                // const a = await chainMetadataByName[name].iconUrl()
                // const a =  (await chainMetadataByName[name].iconUrl()).default
                // console.log(a.default);
                // ImportedIconRef.current = a.default
                // ImportedIconRef.current = a

                // await 도 괄호 안에 넣어야 한다.
                ImportedIconRef.current = (await chainMetadataByName[name].iconUrl()).default


                if (onCompleted) {
                    onCompleted(name, ImportedIconRef.current);
                }
            } catch (err) {
                if (onError) {
                    onError(err);
                }
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name, onCompleted, onError]);

    return { error, loading, SvgIcon: ImportedIconRef.current };
}