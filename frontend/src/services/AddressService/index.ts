import { httpClient } from "../httpClient";

class AddressService {
  async getAddressById(id: string) {
    const { data } = await httpClient.get(`product/${id}`).catch((e) => {
      throw e?.response?.data || e;
    });

    return data;
  }

  async createAddress(input) {
    const { data } = await httpClient.post("address", input).catch((e) => {
      throw e?.response?.data || e;
    });

    return data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AddressService();
