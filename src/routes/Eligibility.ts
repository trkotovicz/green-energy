import { Router } from 'express';
import { validateData } from '../middlewares/validateSchema';
import { eligibilityController } from './main';

const eligibilityRouter = Router();

eligibilityRouter.post('/lemon', validateData, eligibilityController.eligibility);

export default eligibilityRouter;

/**
 * @swagger
 *  tags:
 *    name: Eligibility
 *    description: Verifica a eligibilidade dos clientes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       Eligibility:
 *         type: object
 *         required:
 *            - numeroDoDocumento
 *            - tipoDeConexao
 *            - classeDeConsumo
 *            - modalidadeTarifaria
 *            - historicoDeConsumo
 *         properties:
 *            numeroDoDocumento:
 *              type: string
 *            tipoDeConexao:
 *              type: string
 *            classeDeConsumo:
 *              type: string
 *            modalidadeTarifaria:
 *              type: string
 *            historicoDeConsumo:
 *              type: array
 *         example:
 *            numeroDoDocumento: '46241772000116'
 *            tipoDeConexao: bifasica
 *            classeDeConsumo: comercial
 *            modalidadeTarifaria: convencional
 *            historicoDeConsumo: [3878, 9760, 5976, 2797, 2481]
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       EligibilityResponseSuccess:
 *         type: object
 *         properties:
 *            elegivel:
 *              type: boolean
 *            economiaAnualDeCO2:
 *              type: number
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       EligibilityResponseFailure:
 *         type: object
 *         properties:
 *            elegivel:
 *              type: boolean
 *            razoesDeInelegibilidade:
 *              type: array
 *              items:
 *                type: string
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *       ValidationError:
 *         type: object
 *         properties:
 *            error:
 *              type: string
 */

/**
 * @swagger
 *   /lemon:
 *      post:
 *        tags: [Eligibility]
 *        description: Verifica se o cliente ?? eleg??vel ou n??o. Caso o cliente seja eleg??vel, retorna a quantidade de CO2 que ele estar?? economizando em um ano. Caso o cliente n??o seja eleg??vel, retorna as raz??es pelas quais ele n??o ?? eleg??vel.
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Eligibility'
 *        responses:
 *          200:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/EligibilityResponseSuccess'
 *          202:
 *            description: OK
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/EligibilityResponseFailure'
 *          400:
 *            description: BAD REQUEST
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/ValidationError'
 */
