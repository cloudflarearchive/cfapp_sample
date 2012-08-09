#!/usr/bin/env ruby
require 'rubygems'
require 'rspec'
require 'httparty'
require 'json'

address = 'http://localhost:3000/api'

describe "The server" do
    describe "accounts" do
        describe "legit account" do
            before do
                @response = HTTParty.post(address + '/accounts', {:user_id => 22})
            end
            it "passes" do
                @response.code.should eq 200
                JSON(@response.body)["status"].should eq "approve"
            end
        end
    end
end
