import { Page, Text, View, Document } from '@react-pdf/renderer';

const styles = {
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
};

function PDF () {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Sección #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Sección #2</Text>
        </View>
      </Page>
    </Document>
  );
}

export default PDF;