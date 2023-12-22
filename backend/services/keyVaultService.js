const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const keyVaultUrl = 'https://blueoctopuskv.vault.azure.net/';

async function getSecret(secretName) {
    // Create a SecretClient using Managed Identity
    const credential = new DefaultAzureCredential();
    console.log('Credential:', credential);
    const secretClient = new SecretClient(keyVaultUrl, credential);

    // Retrieve the secret from Key Vault
    try {
        const secretBundle = await secretClient.getSecret(secretName);
        console.log('Secret:', secretBundle);
        return secretBundle.value;
    } catch (error) {
        console.error(`Error retrieving secret: ${error.message}`);
        throw error;
    }
}

module.exports = { getSecret };