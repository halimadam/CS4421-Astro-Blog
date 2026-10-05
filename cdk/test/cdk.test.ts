import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { StaticSiteStack } from '../lib/cdk-stack';

test('CloudFront serves Astro directory routes through index.html', () => {
	const app = new cdk.App();
	const stack = new StaticSiteStack(app, 'TestStack');
	const template = Template.fromStack(stack);

	template.hasResourceProperties('AWS::CloudFront::Function', {
		FunctionCode: Match.stringLikeRegexp("request\\.uri = uri \\+ '/index\\.html'"),
	});
	template.hasResourceProperties('AWS::CloudFront::Distribution', {
		DistributionConfig: Match.objectLike({
			DefaultCacheBehavior: Match.objectLike({
				FunctionAssociations: Match.arrayWith([
					Match.objectLike({ EventType: 'viewer-request' }),
				]),
			}),
		}),
	});
});
