export const HELPERS = {
    getDateTime : function getDateTime(d) {
                        const date = new Date(+d);
                        const dd = String(date.getDate()).padStart(2, '0');
                        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
                        const yyyy = date.getFullYear();
                        const HH = String(date.getHours()).padStart(2, '0');
                        const MM = String(date.getMinutes()).padStart(2, '0');

                        return `${dd}-${mm}-${yyyy} ${HH}:${MM}`;
                    }
}
