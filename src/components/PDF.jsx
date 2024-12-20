import {
  Font,
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: "2% 10%",
    fontFamily: "Roboto",
  },
  headerSection: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    padding: 10,
    border: "2px solid #000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  data: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
    border: "2px solid #000",
    marginTop: 10,
  },
  image: {
    width: 72,
    height: 72,
    margin: "auto 0px",
  },
  boldText: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    textAlign: "center",
    fontSize: 12,
  },
  tableColHeader40: {
    width: "40%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: "#eee",
    borderColor: "#000",
  },
  tableCol60: {
    width: "60%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#000",
    textAlign: "left",
    padding: 0,
    paddingLeft: 30,
  },
  tableCellHeader: {
    margin: 0,
    fontSize: 12,
    fontWeight: "bold",
    padding: 2,
  },
  tableCell: {
    margin: 0,
    fontSize: 12,
    padding: 2,
  },
  nestedTable: {
    width: "100%",
  },
  nestedTableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#eee",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 0,
  },
  nestedTableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    padding: 0,
  },
  process: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#000",
    marginTop: 10,
  },
  tableColHeader30: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#eee",
    borderColor: "#000",
  },
  tableRowProcess: {
    flexDirection: "row",
    textAlign: "center",
    fontSize: 12,
    marginBottom: 10,
  },
  tableColFit: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#000",
    borderLeftWidth: 0,
    fontWeight: "bold",
  },
  tableCol100: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: "#000",
    padding: 0,
    display: "flex",
    flexDirection: "row",
  },
  observation: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff",
    color: "#000",
    border: "2px solid #000",
    display: "flex",
    flexDirection: "row",
  },
});

function PDF({ ot }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerSection}>
          <Image style={styles.image} src="https://i.imgur.com/FFB9BIQ.png" />
          <View>
            <Text style={styles.boldText}>ORDEN DE TRABAJO</Text>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={styles.boldText}>CÓDIGO:</Text>
              <Text> {ot.orden_trabajo_id}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={styles.boldText}>FECHA:</Text>
              <Text>
                {new Date(ot.fecha_creacion).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.data}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader40}>
                <Text style={styles.tableCellHeader}>CLIENTE</Text>
              </View>
              <View style={styles.tableCol60}>
                <Text style={styles.tableCell}>{ot.cliente}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader40}>
                <Text style={styles.tableCellHeader}>PRIORIDAD</Text>
              </View>
              <View style={styles.tableCol60}>
                <Text style={styles.tableCell}>{ot.prioridad}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader40}>
                <Text style={styles.tableCellHeader}>FPE</Text>
              </View>
              <View style={styles.tableCol60}>
                <Text style={styles.tableCell}>
                  {new Date(ot.fecha_probable_entrega).toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {ot.pedidos.map((pedido, index) => (
          <>
            <View style={styles.data}>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableColHeader40, { width: "100%" }]}>
                    <Text style={styles.tableCellHeader}>PRENDA</Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColHeader40}>
                    <Text style={styles.tableCellHeader}>TIPO</Text>
                  </View>
                  <View style={styles.tableCol60}>
                    <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                      {pedido.prenda_nombre}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableColHeader40}>
                    <Text style={styles.tableCellHeader}>CANTIDAD</Text>
                  </View>
                  <View style={styles.tableCol60}>
                    <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                      {pedido.cantidad}
                    </Text>
                  </View>
                </View>

                {/*CARATERISTICAS*/}
                <View style={styles.tableRow}>
                  <View
                    style={[
                      styles.tableColHeader40,
                      {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Text style={styles.tableCellHeader}>CARACTERÍSTICAS</Text>
                  </View>
                  <View
                    style={[styles.tableCol60, { padding: 0, paddingLeft: 0 }]}
                  >
                    <View style={styles.nestedTable}>
                      <View style={styles.tableRow}>
                        <View style={styles.nestedTableColHeader}>
                          <Text style={styles.tableCellHeader}>
                            CINTA REFLECTIVA
                          </Text>
                        </View>
                        <View style={styles.nestedTableCol}>
                          <Text style={[styles.tableCell, styles.boldText]}>
                            {pedido.cinta_reflectiva === 1 ? "SÍ" : "NO"}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={styles.nestedTableColHeader}>
                          <Text style={styles.tableCellHeader}>
                            LOGO FRENTE
                          </Text>
                        </View>
                        <View style={styles.nestedTableCol}>
                          <Text style={[styles.tableCell, styles.boldText]}>
                            {pedido.logo_frente === 1 ? "SÍ" : "NO"}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={styles.nestedTableColHeader}>
                          <Text style={styles.tableCellHeader}>LOGO ATRAS</Text>
                        </View>
                        <View style={styles.nestedTableCol}>
                          <Text style={[styles.tableCell, styles.boldText]}>
                            {pedido.logo_espalda === 1 ? "SÍ" : "NO"}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={styles.nestedTableColHeader}>
                          <Text style={styles.tableCellHeader}>COLOR</Text>
                        </View>
                        <View style={styles.nestedTableCol}>
                          <Text style={styles.tableCell}>
                            {pedido.color_nombre}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={styles.nestedTableColHeader}>
                          <Text style={styles.tableCellHeader}>TELA</Text>
                        </View>
                        <View style={styles.nestedTableCol}>
                          <Text style={styles.tableCell}>
                            {pedido.tela_nombre}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View
                          style={[
                            styles.nestedTableColHeader,
                            { borderBottomWidth: 0 },
                          ]}
                        >
                          <Text style={styles.tableCellHeader}>TALLE</Text>
                        </View>
                        <View
                          style={[
                            styles.nestedTableCol,
                            { borderBottomWidth: 0 },
                          ]}
                        >
                          <Text style={styles.tableCell}>{pedido.talle}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        ))}

        <View style={styles.observation}>
          <View
            style={[
              styles.tableColFit,
              {
                border: 0,
                backgroundColor: "#eee",
                borderRightWidth: 2,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              },
            ]}
          >
            <Text
              style={{ fontWeight: "bold", marginLeft: 10, marginRight: 10 }}
            >
              OBSERVACIONES
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

PDF.propTypes = {
  ot: PropTypes.object.isRequired,
};

export default PDF;
