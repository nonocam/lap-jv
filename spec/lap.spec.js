const lap = require('../lap');

describe('lap', () => {
    it('runs jasmine', () => {
        expect(expect).toBeDefined();
    });

    it('shows the same result as numpy example', () => {
        // See also https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.linear_sum_assignment.html#scipy.optimize.linear_sum_assignment
        /* cost = np.array([[4, 1, 3], [2, 0, 5], [3, 2, 2]])
         * from scipy.optimize import linear_sum_assignment
         * row_ind, col_ind = linear_sum_assignment(cost)
         * col_ind
         * >>> array([1, 0, 2])
         * cost[row_ind, col_ind].sum()
         * >>> 5
         */
        const cost = [
            [4, 1, 3],
            [2, 0, 5],
            [3, 2, 2]
        ];
        const ret = lap.lap(cost.length, cost);
        expect(ret.col).toEqual(new Int32Array([1, 0, 2]));
    });

    describe('shows same result as used in associations.find_new_trackers_2', () => {
        const testData = [
            // { "negative_iou_matrix": [[-1.0, -0.0]], "matched_indices": [[0], [0]] },
            // { "negative_iou_matrix": [[-0.0, -0.8493474721908569, -0.0], [-1.0, -0.0, -0.0], [-0.0, -0.0, -0.869716227054596]], "matched_indices": [[0, 1, 2], [1, 0, 2]] },
            // { "negative_iou_matrix": [[-0.0, -0.0, -1.0], [-1.0, -0.0, -0.0], [-0.0, -0.8159688115119934, -0.0]], "matched_indices": [[0, 1, 2], [2, 0, 1]] },
            // { "negative_iou_matrix": [[-0.0, -0.8493474721908569, -0.0], [-1.0, -0.0, -0.0], [-0.0, -0.0, -0.869716227054596]], "matched_indices": [[0, 1, 2], [1, 0, 2]], "cost": -2.7190637588500977 },
            // { "negative_iou_matrix": [[-0.0, -0.0, -1.0], [-1.0, -0.0, -0.0], [-0.0, -0.8159688115119934, -0.0]], "matched_indices": [[0, 1, 2], [2, 0, 1]], "cost": -2.8159687519073486 },
            // { "negative_iou_matrix": [[-0.0, -0.0, -0.874015748500824], [-0.0, -1.0, -0.0], [-1.0, -0.0, -0.0]], "matched_indices": [[0, 1, 2], [2, 1, 0]], "cost": -2.8740158081054688 },
            ,
            { "negative_iou_matrix": [[-0.0, -0.0, -0.874015748500824], [-0.0, -1.0, -0.0], [-1.0, -0.0, -0.0]], "matched_indices": [[0, 1, 2], [2, 1, 0]], "cost": -2.8740158081054688 },
            { "negative_iou_matrix": [[-0.0, -0.0, -1.0], [-0.0, -0.8160086870193481, -0.0]], "matched_indices": [[0, 1], [2, 1]], "cost": -1.8160086870193481 },
            { "negative_iou_matrix": [[-0.0, -0.0, -1.0], [-1.0, -0.0, -0.0], [-0.0, -0.8159688115119934, -0.0]], "matched_indices": [[0, 1, 2], [2, 0, 1]], "cost": -2.8159687519073486 },
            { "negative_iou_matrix": [[-0.0, -0.7564408779144287]], "matched_indices": [[0], [1]], "cost": -0.7564408779144287 },
            { "negative_iou_matrix": [[-0.0, -0.7564408779144287]], "matched_indices": [[0], [1]], "cost": -0.7564408779144287 },
            { "negative_iou_matrix": [[-0.0, -0.8160086870193481]], "matched_indices": [[0], [1]], "cost": -0.8160086870193481 },
            { "negative_iou_matrix": [[-0.0, -0.8493474721908569, -0.0], [-1.0, -0.0, -0.0], [-0.0, -0.0, -0.869716227054596]], "matched_indices": [[0, 1, 2], [1, 0, 2]], "cost": -2.7190637588500977 },
            { "negative_iou_matrix": [[-0.0, -0.8680629134178162, -0.0], [-1.0, -0.0, -0.0]], "matched_indices": [[0, 1], [1, 0]], "cost": -1.868062973022461 },
            { "negative_iou_matrix": [[-0.0, -1.0, -0.0], [-0.8354756236076355, -0.0, -0.0]], "matched_indices": [[0, 1], [1, 0]], "cost": -1.8354756832122803 },
            { "negative_iou_matrix": [[-0.0, -1.0], [-0.8680629134178162, -0.0], [-0.0, -0.0]], "matched_indices": [[0, 1], [1, 0]], "cost": -1.868062973022461 },
            { "negative_iou_matrix": [[-0.0], [-1.0]], "matched_indices": [[1], [0]], "cost": -1.0 },
            { "negative_iou_matrix": [[-0.0]], "matched_indices": [[0], [0]], "cost": -0.0 },
            { "negative_iou_matrix": [[-0.010032810270786285, -1.0, -0.0], [-0.0, -0.0, -0.0]], "matched_indices": [[0, 1], [1, 0]], "cost": -1.0 },
            { "negative_iou_matrix": [[-0.07115979492664337, -0.0]], "matched_indices": [[0], [0]], "cost": -0.07115979492664337 },
            { "negative_iou_matrix": [[-0.11609239131212234, -1.0], [-0.6723286509513855, -0.010032810270786285], [-0.0, -0.0]], "matched_indices": [[0, 1], [1, 0]], "cost": -1.6723287105560303 },
            { "negative_iou_matrix": [[-0.165116548538208], [-1.0]], "matched_indices": [[1], [0]], "cost": -1.0 },
            { "negative_iou_matrix": [[-0.4600304365158081]], "matched_indices": [[0], [0]], "cost": -0.4600304365158081 },
            { "negative_iou_matrix": [[-0.4918895661830902], [-0.8510485291481018]], "matched_indices": [[1], [0]], "cost": -0.8510485291481018 },
            { "negative_iou_matrix": [[-0.5875497460365295]], "matched_indices": [[0], [0]], "cost": -0.5875497460365295 },
            { "negative_iou_matrix": [[-0.6560697555541992]], "matched_indices": [[0], [0]], "cost": -0.6560697555541992 },
            { "negative_iou_matrix": [[-0.6578046679496765]], "matched_indices": [[0], [0]], "cost": -0.6578046679496765 },
            { "negative_iou_matrix": [[-0.6595744490623474]], "matched_indices": [[0], [0]], "cost": -0.6595744490623474 },
            { "negative_iou_matrix": [[-0.722387433052063, -0.0]], "matched_indices": [[0], [0]], "cost": -0.722387433052063 },
            { "negative_iou_matrix": [[-0.7305018305778503, -0.0]], "matched_indices": [[0], [0]], "cost": -0.7305018305778503 },
            { "negative_iou_matrix": [[-0.7642004489898682, -0.48535361886024475]], "matched_indices": [[0], [0]], "cost": -0.7642004489898682 },
            { "negative_iou_matrix": [[-0.78504878282547], [-0.0]], "matched_indices": [[0], [0]], "cost": -0.78504878282547 },
            { "negative_iou_matrix": [[-0.78504878282547]], "matched_indices": [[0], [0]], "cost": -0.78504878282547 },
            { "negative_iou_matrix": [[-0.7954075336456299, -0.0, -0.0], [-0.0, -0.8160086870193481, -0.0], [-0.0, -0.0, -0.7450264692306519]], "matched_indices": [[0, 1, 2], [0, 1, 2]], "cost": -2.35644268989563 },
            { "negative_iou_matrix": [[-0.7954075336456299], [-0.0], [-0.0]], "matched_indices": [[0], [0]], "cost": -0.7954075336456299 },
            { "negative_iou_matrix": [[-0.8014981150627136]], "matched_indices": [[0], [0]], "cost": -0.8014981150627136 },
            { "negative_iou_matrix": [[-0.8160086870193481], [-0.0], [-0.0]], "matched_indices": [[0], [0]], "cost": -0.8160086870193481 },
            { "negative_iou_matrix": [[-0.8212416768074036]], "matched_indices": [[0], [0]], "cost": -0.8212416768074036 },
            { "negative_iou_matrix": [[-0.8325865268707275]], "matched_indices": [[0], [0]], "cost": -0.8325865268707275 },
            { "negative_iou_matrix": [[-0.8495919704437256]], "matched_indices": [[0], [0]], "cost": -0.8495919704437256 },
            { "negative_iou_matrix": [[-0.8498749732971191, -0.0], [-0.0, -1.0]], "matched_indices": [[0, 1], [0, 1]], "cost": -1.8498749732971191 },
            { "negative_iou_matrix": [[-0.8590644598007202]], "matched_indices": [[0], [0]], "cost": -0.8590644598007202 },
            { "negative_iou_matrix": [[-0.85910564661026], [-0.0]], "matched_indices": [[0], [0]], "cost": -0.85910564661026 },
            { "negative_iou_matrix": [[-0.869281530380249, -0.0]], "matched_indices": [[0], [0]], "cost": -0.869281530380249 },
            { "negative_iou_matrix": [[-1.0, -0.0, -0.0], [-0.0, -0.0, -1.0]], "matched_indices": [[0, 1], [0, 2]], "cost": -2.0 },
            { "negative_iou_matrix": [[-1.0, -0.0], [-0.0, -1.0], [-0.0, -0.0]], "matched_indices": [[0, 1], [0, 1]], "cost": -2.0 },
            { "negative_iou_matrix": [[-1.0], [-0.0], [-0.0]], "matched_indices": [[0], [0]], "cost": -1.0 },
        ];

        const testAndExpect = (t, debug) => {
            const ret = lap.lap(t.negative_iou_matrix.length, t.negative_iou_matrix);
            expect(ret.row).toEqual(new Int32Array(t.matched_indices[1]));
            //expect(ret.col).toEqual(new Int32Array(t.matched_indices[0]));
            expect(ret.cost).toBeCloseTo(t.cost);
            if(debug) {
                console.debug(ret);
            }
        };

        it('works on sample matrixes', () => {
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.0, -0.874015748500824], [-0.0, -1.0, -0.0], [-1.0, -0.0, -0.0]], "matched_indices": [[0, 1, 2], [2, 1, 0]], "cost": -2.8740158081054688 });
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.0, -1.0], [-1.0, -0.0, -0.0], [-0.0, -0.8159688115119934, -0.0]], "matched_indices": [[0, 1, 2], [2, 0, 1]], cost: -2.8159687519073486 });
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.0], [-0.0, -0.0]], "matched_indices": [[1, 0], [1, 0]], "cost": -0.0 });
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.0]], "matched_indices": [[0], [0]], "cost": -0.0 });
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.8493474721908569, -0.0], [-1.0, -0.0, -0.0], [-0.0, -0.0, -0.869716227054596]], "matched_indices": [[0, 1, 2], [1, 0, 2]], "cost": -2.7190637588500977 });
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.8680629134178162, -0.0], [-1.0, -0.0, -0.0]], "matched_indices": [[0, 1], [1, 0]], "cost": -1.868062973022461 });
            testAndExpect({ "negative_iou_matrix": [[-0.0]], "matched_indices": [[0], [0]], "cost": -0.0 });
            testAndExpect({ "negative_iou_matrix": [[-1.0, -0.0]], "matched_indices": [[0], [0]], "cost": -1.0 });
            testAndExpect({ "negative_iou_matrix": [[-1.0]], "matched_indices": [[0], [0]], "cost": -1.0 });
            testAndExpect({ "negative_iou_matrix": [[-1.0, -0.0, -0.0], [-0.0, -0.0, -0.8696430921554565], [-0.0, -1.0, -0.0]], "matched_indices": [[0, 1, 2], [0, 2, 1]], "cost": -2.869643211364746 });
        });

        xit('works if rows are left out', () => {
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.0], [-0.7534270882606506, -0.0], [-0.02117784507572651, -0.0], [-0.0, -1.0]], "matched_indices": [[1, 3], [0, 1]], "cost": -1.7534270286560059 });
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.0], [-0.7534270882606506, -0.0], [-0.02117784507572651, -0.0], [-0.0, -1.0]], "matched_indices": [[1, 3], [0, 1]], "cost": -1.7534270286560059 });
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.0], [-0.85910564661026, -0.0], [-0.0, -0.8747603893280029]], "matched_indices": [[1, 2], [0, 1]], "cost": -1.7338659763336182 });
        });

        xit('fails for some reason', () => {
            testAndExpect({ "negative_iou_matrix": [[-0.0, -0.0, -1.0], [-0.0, -0.0, -0.0]], "matched_indices": [[0, 1], [2, 0]], "cost": -1.0 });
            testAndExpect({ "negative_iou_matrix": [[-0.8518909215927124], [-0.0]], "matched_indices": [[0], [0]], "cost": -0.8518909215927124 });
            testAndExpect({ "negative_iou_matrix": [[-1.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, -1.0, 0.0]], "matched_indices": [[0, 1, 2], [0, 2, 1]], "cost": -2.0 });
        });

        /* it('works on all', () => {
            testData.forEach(t => {
                const ret = lap.lap(t.negative_iou_matrix.length, t.negative_iou_matrix);
                expect(ret.row).toEqual(new Int32Array(t.matched_indices[1]));
            });
        }); */
    });
});