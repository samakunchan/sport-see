/**
 * Service parent afin de faire hériter les propriétés importantes d'une construction de graph
 * @param ref {MutableRefObject<undefined>.current} - `svgRef.current`. Référence du graph
 * @param svgWidth {number} Largeur du graph
 * @param svgHeight {number} Hauteur du graph
 * @param margin {{ top: number, right: number, bottom: number, left: number }} - Les marges du graph
 * @class
 */
export class GraphService {
  /**
   * @param ref {MutableRefObject<undefined>.current} - `svgRef.current`. Référence du graph
   * @param svgWidth {number} Largeur du graph
   * @param svgHeight {number} Hauteur du graph
   * @param margin {{ top: number, right: number, bottom: number, left: number }} - Les marges du graph
   * @constructor
   */
  constructor({ ref, svgWidth, svgHeight, margin }) {
    if (ref !== null && svgWidth !== null && svgHeight !== null && !!margin) {
      this._ref = ref;
      this._svgWidth = svgWidth;
      this._svgHeight = svgHeight;
      this._margin = margin;
    } else {
      const refMsg = !!ref ? 'DEFINIS' : 'PAS DEFINIS OU NULL';
      const widthMsg = !!svgWidth ? 'DEFINIS' : 'PAS DEFINIS OU NULL';
      const heightMsg = !!svgHeight ? 'DEFINIS' : 'PAS DEFINIS OU NULL';
      const marginMsg = !!margin ? 'DEFINIS' : 'PAS DEFINIS OU NULL';
      throw new Error(this._getErrorMessage({ refMsg, widthMsg, heightMsg, marginMsg }));
    }
  }

  _getErrorMessage({ refMsg, widthMsg, heightMsg, marginMsg }) {
    let msg = `Valeurs non définis: ref=${refMsg}, svgWidth=${widthMsg}, svgHeight=${heightMsg}, margin=${marginMsg}. `;
    msg += `Relancez l'app après la correction.`;
    return msg;
  }
}
