const Excel = verquire('exceljs');

function addTableWithBadName(ref, ws) {
  return ws.addTable({
    name: '5 Test Table', // bad name: initial digit, spaces
    ref,
    headerRow: true,
    totalsRow: true,
    style: {
      theme: 'TableStyleDark3',
      showRowStripes: true,
    },
    columns: [
      {name: 'Date', totalsRowLabel: 'Totals', filterButton: true},
      {
        name: 'Id',
        totalsRowFunction: 'max',
        filterButton: true,
        totalsRowResult: 4,
      },
      {
        name: 'Word',
        filterButton: false,
        style: {font: {bold: true, name: 'Comic Sans MS'}},
      },
    ],
    rows: [
      [new Date('2019-08-01'), 1, 'Bird'],
      [new Date('2019-08-02'), 2, 'is'],
      [new Date('2019-08-03'), 3, 'the'],
      [new Date('2019-08-04'), 4, 'Word'],
    ],
  });
}

describe('Table', () => {
  it('errors when creating a table with invalid name', () => {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('blort');
    addTableWithBadName('A1', ws);
    expect(() => {
      ws.commit();
    }).to.throw();
  });
});
