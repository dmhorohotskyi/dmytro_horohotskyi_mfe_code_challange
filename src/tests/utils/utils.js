import utils from "../../../src/utils/utils.js"
import {expect} from "chai";

describe('utils', () => {
    describe('test formatDateInYYYYMMDD method', () => {
        it('it should return date in YYYY - MM - DD format', () => {
            const retsult = utils.formatDateInYYYYMMDD('07/18/2023');

            expect (retsult).to.be.deep.equal('2023 - 07 - 18');
        })
    });

    describe('test formatDateInDDMMYYYY method', () => {
        it('it should return date in DD.MM.YYYY format', () => {
            const retsult = utils.formatDateInDDMMYYYY('07/18/2023');

            expect (retsult).to.be.deep.equal('18.07.2023');
        })
    });


});