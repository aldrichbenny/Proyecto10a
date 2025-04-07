import requests
from datetime import datetime, timedelta

class CurrencyService:
    BANXICO_BASE_URL = "https://www.banxico.org.mx/SieAPIRest/service/v1/series"
    EXCHANGE_RATE_SERIES = "SF43718"  # Serie para tipo de cambio USD/MXN
    TOKEN = "e3980208bf01ec653aba9aee3c2d6f70f6ae8b066d2545e379b9e0ef92e9de25"
    DEFAULT_RATE = 17.50  # Tasa de cambio por defecto en caso de error

    @staticmethod
    def get_latest_exchange_rate():
        try:
            headers = {"Bmx-Token": CurrencyService.TOKEN}
            
            # Usar una fecha reciente en lugar de la actual
            end_date = "2024-04-07"
            start_date = "2024-04-01"
            
            url = f"{CurrencyService.BANXICO_BASE_URL}/{CurrencyService.EXCHANGE_RATE_SERIES}/datos/{start_date}/{end_date}"
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            if data["bmx"]["series"][0]["datos"]:
                latest_rate = float(data["bmx"]["series"][0]["datos"][-1]["dato"])
                return latest_rate
            
            return CurrencyService.DEFAULT_RATE
            
        except Exception as e:
            print(f"Error getting exchange rate: {e}")
            return CurrencyService.DEFAULT_RATE

    @staticmethod
    def convert_mxn_to_usd(amount_mxn):
        if amount_mxn is None:
            return None
        rate = CurrencyService.get_latest_exchange_rate()
        try:
            return round(float(amount_mxn) / rate, 2)
        except (ValueError, TypeError):
            return None

    @staticmethod
    def convert_price_in_response(data, to_usd=False):
        if not to_usd:
            return data
            
        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict):
                    CurrencyService._convert_price_in_dict(item)
        elif isinstance(data, dict):
            CurrencyService._convert_price_in_dict(data)
            
        return data

    @staticmethod
    def _convert_price_in_dict(data):
        if not isinstance(data, dict):
            return
            
        if 'precio_producto' in data:
            try:
                mxn_price = data['precio_producto']
                usd_price = CurrencyService.convert_mxn_to_usd(mxn_price)
                if usd_price is not None:
                    data['precio_producto'] = str(usd_price)
                    data['currency'] = 'USD'
            except (ValueError, TypeError):
                pass
            
            for key, value in data.items():
                if isinstance(value, (dict, list)):
                    CurrencyService.convert_price_in_response(value, True)
