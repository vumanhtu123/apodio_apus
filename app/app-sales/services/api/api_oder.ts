import { ApiResponse } from "apisauce";
import { hideLoading, showLoading } from "../../utils/toast";
import { ApiOrder } from "../base-api/api-config-order";
import { ApiEndpoint } from "../base-api/api_endpoint";
import { Loading } from "../../../components/dialog-notification";
import { ApiAccounting } from "../base-api/api-config-accounting";
import { TaxModel } from "../../models/order-store/entities/order-tax-model";
import { DebtModel } from "../../models/order-store/entities/order-debt-limit-model";
import { TaxLineModel } from "../../models/order-store/entities/order-tax-lines-model";
import { TYPE_DEBT, CONTRACT_TYPE } from "../../utils/enum";

export class OrderApi {
  private api: ApiOrder;
  private apiAccount: ApiAccounting;

  constructor(api: ApiOrder, apiAccount: ApiAccounting) {
    this.api = api;
    this.apiAccount = apiAccount;
  }

  async getListOrder(
    page: number,
    size: number,
    state: string,
    search: string,
    fromCreateDate: any,
    toCreateDate: any
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER,
        {
          page,
          size,
          state,
          search,
          fromCreateDate,
          toCreateDate
          // activated
        }
      );
      Loading.hide();
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getDetailInvoice(id: number): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.apiAccount.apisauce.get(
        ApiEndpoint.GET_DETAIL_INVOICE,
        {
          id,
        }
      );
      Loading.hide();
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-data", data);
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async printInvoice(id: number): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.apiAccount.apisauce.get(
        ApiEndpoint.PRINT_INVOICE,
        {
          id,
          invoiceType: 'SALE'
        }
      );
      Loading.hide();
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-dataPrintVoice", data);
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async createInvoice(invoiceAdd: any): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      // console.log('first0--' ,ApiEndpoint.GET_LIST_ORDER )
      const response: ApiResponse<any> = await this.apiAccount.apisauce.put(
        ApiEndpoint.CREATE_INVOICE,
        invoiceAdd
      );
      Loading.hide();
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getListOrderProduct(
    page: number,
    size: number,
    productCategoryId: number | undefined,
    search: string,
    tagIds: number[],
    sort: string,
    isLoadMore: boolean,
    warehouseId: number | undefined
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const tagString =
        tagIds.length === 0 ? "" : "&tagIds=" + tagIds.join("&tagIds=");
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER_PRODUCT + "?size=" + size + sort + tagString,
        {
          page: page,
          // size: size,
          productCategoryId: productCategoryId,
          search: search,
          // tagIds: tagIds.length === 0 ? null : tagIds,
          warehouseId: warehouseId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getListOrderVariant(
    page: number,
    size: number,
    productCategoryId: number | undefined,
    search: string,
    tagIds: number[],
    sort: string,
    isLoadMore: boolean,
    warehouseId: number | undefined,
    productTemplateId: number | undefined
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const tagString =
        tagIds.length === 0 ? "" : "&tagIds=" + tagIds.join("&tagIds=");
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER_VARIANT + "?size=" + size + sort + tagString,
        {
          page: page,
          // size: size,
          productCategoryId: productCategoryId,
          search: search,
          // tagIds: tagIds.length === 0 ? null : tagIds,
          warehouseId: warehouseId,
          productTemplateId: productTemplateId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getListOrderProductPrice(
    page: number,
    size: number,
    productCategoryId: number| undefined,
    search: string,
    tagIds: number[],
    sort: string,
    isLoadMore: boolean,
    warehouseId: number | undefined,
    priceListId: number | undefined
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const tagString =
        tagIds.length === 0 ? "" : "&tagIds=" + tagIds.join("&tagIds=");
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER_PRODUCT_PRICE +
        "?size=" +
        size +
        sort +
        tagString,
        {
          page: page,
          // size: size,
          productCategoryId: productCategoryId,
          search: search,
          // tagIds: tagIds.length === 0 ? null : tagIds,
          warehouseId: warehouseId,
          priceListId: priceListId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getListOrderVariantPrice(
    page: number,
    size: number,
    productCategoryId: number | undefined,
    search: string,
    tagIds: number[],
    sort: string,
    isLoadMore: boolean,
    warehouseId: number | undefined,
    productTemplateId: number | undefined,
    priceListId: number
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const tagString =
        tagIds.length === 0 ? "" : "&tagIds=" + tagIds.join("&tagIds=");
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_LIST_ORDER_VARIANT_PRICE +
        "?size=" +
        size +
        sort +
        tagString,
        {
          page: page,
          // size: size,
          productCategoryId: productCategoryId,
          search: search,
          // tagIds: tagIds.length === 0 ? null : tagIds,
          warehouseId: warehouseId,
          productTemplateId: productTemplateId,
          priceListId: priceListId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getListAccountLedger(): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.apiAccount.apisauce.get(
        ApiEndpoint.GET_LIST_ACCOUNT_LEDGER + "?isDefault=true"
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getDebtAccountLedger(
    accountLedgerId: any,
    start: string,
    end: string,
    customerId: any,
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.apiAccount.apisauce.get(
        ApiEndpoint.GET_DEBT_ACCOUNT_LEDGER + "?type=EXTERNAL",
        {
          accountLedgerId: accountLedgerId,
          start: start,
          end: end,
          customerId: customerId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async getBalanceLimit(
    partnerId: any,
  ): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.apiAccount.apisauce.get(
        ApiEndpoint.GET_BALANCE_LIMIT + "?type=EXTERNAL" + '&moveType=OUT_INVOICE',
        {
          partnerId: partnerId,
        }
      );
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data);
      Loading.hide();
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }

  async getDetailOrder(id: number, isLoading?: boolean): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_DETAIL_ORDER,
        {
          id, isLoading
        }
      );
      if (isLoading) {
        Loading.hide();
      }
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data.message);
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      if (isLoading) {
        Loading.hide();
      }
      return { kind: "bad-data" };
    }
  }
  async getPaymentTerm(page: number, size: number): Promise<any> {
    Loading.show({
      text: "Loading...",
    });
    try {
      const response: ApiResponse<any> = await this.apiAccount.apisauce.get(
        ApiEndpoint.GET_LIST_PAYMENT_TERM,
        {
          page,
          size,
          type: "SALE",
        }
      );
      Loading.hide();
      console.log("-----------------respone", response);
      const data = response.data;
      console.log("-----------------data", data.message);
      if (response.data.data) {
        return { kind: "ok", response: data };
      }
      return { kind: "bad-data", response: data };
    } catch (e) {
      Loading.hide();
      return { kind: "bad-data" };
    }
  }
  async getTaxList(
    type: any,
    scopeType: any,
    page: any,
    size: any
  ): Promise<BaseResponse<TaxModel, ErrorCode> | undefined> {
    // Loading.show({
    //   text: "Loading...",
    // });
    // try {
      const response: ApiResponse<BaseResponse<TaxModel, ErrorCode>> =
        await this.apiAccount.apisauce.get(ApiEndpoint.GET_LIST_TAX, {
          type: type,
          scopeType: scopeType,
          page: page,
          size: size
        });
      const data = response.data;
      Loading.hide();
      if (response.status === 200) {
        Loading.hide();
        return data;
      }
      Loading.hide();
      return data;
    // } catch (e) {
    //   Loading.hide();
    //   return { kind: "bad-data" };
    // }
  }

  async getDebtLimit(
    partnerId: any
    // type: any,
    // contractType: any
  ): Promise<BaseResponse<DebtModel, ErrorCode> | undefined> {
    Loading.show({
      text: "Loading...",
    });
    // try {
      const response: ApiResponse<BaseResponse<DebtModel, ErrorCode>> =
        await this.apiAccount.apisauce.get(ApiEndpoint.GET_DEBT_LIMIT, {
          partnerId: partnerId,
          type: TYPE_DEBT.EXTERNAL,
          contractType: CONTRACT_TYPE.SALE,
        });
      const data = response.data;
      if (response.status === 200) {
        console.log("tuvm debt", data);
        Loading.hide();
        return data;
      }
      Loading.hide();
      return data;
    // } catch (e) {
    //   Loading.hide();
    //   return { kind: "bad-data" };
    // }
  }

  async postTaxLines(
    formTax: []
  ): Promise<BaseResponse<TaxLineModel, ErrorCode> | undefined> {
    Loading.show({
      text: "Loading...",
    });
    // try {
      const response: ApiResponse<BaseResponse<TaxLineModel, ErrorCode>> =
        await this.api.apisauce.post(ApiEndpoint.POST_LIST_TAX_LINES, formTax);
      const data = response.data;
      if (response.status === 200) {
        Loading.hide();
        return data;
      }
      Loading.hide();
      return data;
    // } catch (e) {
    //   Loading.hide();
    //   return { kind: "bad-data" };
    // }
  }
  async cancelOrder(id: any): Promise<any> {
    Loading.show({
      text: "Loading...",
      onShow: () => console.log("Loading shown"),
      onHide: () => console.log("Loading hidden"),
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.put(
        ApiEndpoint.CANCEL_ORDER + "?id=" + id
      );
      Loading.hide();
      console.log("----------delete", response.status);
      const result = response.data;
      if (response.data.errorCodes) {
        return { kind: "bad-data", result };
      } else {
        return { kind: "ok", result };
      }
    } catch (error) {
      Loading.hide();
      return { kind: "bad-data", result: error };
    }
  }
  async stateAllow(id: any): Promise<any> {
    Loading.show({
      text: "Loading...",
      onShow: () => console.log("Loading shown"),
      onHide: () => console.log("Loading hidden"),
    });
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        ApiEndpoint.GET_STATE_ALLOW + "?id=" + id
      );
      Loading.hide();
      console.log("----------state", response);
      const result = response.data;
      if (response.data.errorCodes) {
        return { kind: "bad-data", result };
      } else {
        return { kind: "ok", result };
      }
    } catch (error) {
      Loading.hide();
      return { kind: "bad-data", result: error };
    }
  }
  async postNewOrder(form: any): Promise<BaseResponse<any, ErrorCode> | undefined> {
    Loading.show({
      text: "Loading...",
    });
    // try {
      const response: ApiResponse<BaseResponse<any, ErrorCode>> =
        await this.api.apisauce.post(ApiEndpoint.POST_ADD_SALE_ORDER, form);
      const data = response.data;
      if (response.status === 200) {
        Loading.hide();
        return data;
      }
      Loading.hide();
      return data;
    // } catch (e) {
    //   Loading.hide();
    //   return { kind: "bad-data" };
    // }
  }
}
