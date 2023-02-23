import * as request from '~/util/request';
//** get request - retrieve version code from server */
export const retrieveVersions = async () => {
    try {
        const res = await request.get(`version`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//** get request - get specific version code item from server */

export const getVersion = async (versionId) => {
    try {
        const res = await request.get(`version/${versionId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
