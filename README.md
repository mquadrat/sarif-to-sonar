# Sarif to Sonar

This action converts a SARIF report to a soner issues file.

## Inputs

### `sarif-file`

**Required** The name of the SARIF report 

### `sonar-file`

**Required** The name of the Sonar file 


## Example usage

uses: mquadrat/sarif-to-sonar@v1
with:
  sarif-file: 'results.sarif'
  sonar-file: 'results.sonar'