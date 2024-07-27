export async function getData<T>(url: string) {
    // try {
    //     const resp = await fetch(url);
    //     if(!resp.ok) throw resp;
    //     const data = await resp.json() as T;
    //     return data;

    // } catch (error) {

    // }
    const resp = await fetch(url);
    if (!resp.ok) throw resp;
    const data = await resp.json() as T;
    return data;
}

