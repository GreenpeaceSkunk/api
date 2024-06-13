import axios from 'axios';

export const getById = async (id: string): Promise<any> => {
  return await axios({
    method: 'GET',
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/lists/batch?listId=${id}`,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  .then(result => {
    return {
      unique_count: result.data.lists[0].metaData.size,
    };
  })
  .catch(error => {
    return {
      status: 404,
      errorMessage: 'List `${}` not found.'
    };
  });
}
