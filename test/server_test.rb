#!/usr/bin/env ruby
require 'rubygems'
require 'rspec'
require 'httparty'
require 'json'


def post(endpoint, body)
    address = 'http://localhost:5000/api'
    HTTParty.post(address + '/' + endpoint, :body => body, :output => :json, :format => :json)
end

describe "The server" do
    describe "accounts" do
        describe "legit" do
            before do
                @response = post('accounts', {:account_id => 22})
            end
            it "approves the account" do
                @response.code.should eq 200
                ["approve", "exists"].should include JSON(@response.body)["status"]
            end
            it "provides a login url" do
                JSON(@response.body)["login"]["url"].should == "https://mysite.com/login"
                JSON(@response.body)["login"]["expires"].should == "2012-09-05 23:23:56 UTC"
            end

        end

        describe "no account id" do
            before do
                @response = post('accounts', {:user_id => 22})
            end
            it "angers" do
                @response.code.should eq 400
                JSON(@response.body)["error"].should eq "no account_id"
            end
        end
    end
    describe "domains" do
        describe "legit" do
            before do
                @response = post('domains', {:account_id => 22, :domain_id=>33})
            end
            it "passes" do
                @response.code.should eq 200
                ["approve", "exists"].should include JSON(@response.body)["status"]
            end
        end

        describe "no account id" do
            before do
                @response = post('accounts', {:user_id => 22})
            end
            it "angers" do
                @response.code.should eq 400
                JSON(@response.body)["error"].should eq "no account_id"
            end
        end

        describe "no domain id" do
            before do
                @response = post('accounts', {:account => 22})
            end
            it "angers" do
                @response.code.should eq 400
                JSON(@response.body)["error"].should eq "no account_id"
            end
        end

    end

end
